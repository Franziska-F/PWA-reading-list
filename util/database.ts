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

export default async function registerUser(username: string, password_hash: string) {
const [user] = await sql <[User]>`INSERT INTO
users (username, password_hash)
VALUES
(
  ${username}, ${password_hash}
)
RETURNING
id,
username`
;
return user;

}