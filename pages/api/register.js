import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { serializedSessionTokenCookie } from '../../util/cookies';
import { createSession, registerUser } from '../../util/database';

export default async function register(req, res) {
  if (req.method === 'POST') {
    if (
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password
    ) {
      res.status(400).json({
        errors: [{ message: 'Please choose a username and a password' }],
      });
      return;
    }
    const user = req.body;

    const username = user.username;

    const passwordHash = await bcrypt.hash(req.body.password, 12);

    // register new User
    const newUser = await registerUser(username, passwordHash);
    
    // session token

    const sessionToken = crypto.randomBytes(80).toString('base64');

    // create new session

    const newSession = await createSession(newUser.id, sessionToken);

    const serializedCookie = await serializedSessionTokenCookie(
      newSession.session_token,
    );

    // create  cookie in browser
    res
      .status(200)
      .setHeader('set-Cookie', serializedCookie)
      .json({ user: { id: newUser.id } });
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
