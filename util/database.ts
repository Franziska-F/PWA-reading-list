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
  const session = await sql`INSERT INTO
sessions (user_id, session_token)
VALUES
(${userId}, ${sessionToken})
RETURNING
id,
session_token`;
  return session;
}
