import { config } from 'dotenv';
import postgres from 'postgres';

// import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

// setPostgresDefaultsOnHeroku();
config();
// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}
const sql = connectOneTimeToDatabase();

// Register new user

export type User = {
  id: number;
  username: string;
};

export async function registerUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`INSERT INTO
users (username, password_hash)
VALUES
(
  ${username}, ${passwordHash}
)
RETURNING
id,
username`;
  console.log('DB', user);
  return user;
}

export async function createSession(userId: number, sessionToken: string) {
  const [session] = await sql`INSERT INTO
sessions (user_id, session_token)
VALUES
(${userId}, ${sessionToken})
RETURNING
id,
session_token`;
  return session;
}

// Delete session

export async function deleteSession(token: string) {
  const [session] = await sql`
  DELETE FROM
sessions
WHERE

sessions.session_token = ${token}

RETURNING *`;

  return session;
}

// Get user by username

export async function getUserByUsername(username: string) {
  if (!username) return undefined;
  const [user] = await sql<[User | undefined]>`
  SELECT
  id,
  username
  FROM
  users
  WHERE
  username = ${username}`;
  return user;
}

// Get user with passwordhash by username

export async function getUserWithHashByUsername(username: string) {
  if (!username) return undefined;
  const [userWithHash] = await sql`
  SELECT
 *
  FROM
  users
  WHERE
  username = ${username}`;

  return userWithHash;
}

// GET user with valid session by userId

export async function getValidUser(sessionToken: string) {
  if (!sessionToken) return undefined;
  const [validUser] = await sql`
  SELECT
  users.id,
  users.username
  FROM
  users, sessions
  WHERE sessions.session_token = ${sessionToken} AND sessions.user_id
  = users.id AND sessions.expiry_timestamp > now()
   `;

  // delte expired sessions
  return validUser;
}

// POST book on readingList

export async function putBookonList(userId: number, bookId: string) {
  const book = await sql`
  INSERT INTO
  books (user_id, book_id, current_status)
  VALUES
  (${userId}, ${bookId}, 'reading' )
  RETURNING
  *`;
  return book;
}
