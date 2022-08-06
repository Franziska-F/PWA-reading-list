import bcrypt from 'bcrypt';
import { serializedSessionTokenCookie } from '../../util/cookies';
import { createSession, getUserWithHashByUsername } from '../../util/database';

export default async function login(req, res) {
  if (req.method === 'POST') {
    if (
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password
    ) {
      res
        .status(400)
        .jsaon({ errors: [{ message: 'username or password missing' }] });
      return;
    }

    // Caution: this variable has the passwordhash stringed to it!
    const userWithPasswordHash = await getUserWithHashByUsername(
      req.body.username,
    );

    // check if password is correct

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userWithPasswordHash.password_hash,
    );
    console.log(res);
    if (!passwordMatch) {
      res
        .status(401)
        .json({ errors: [{ message: 'Password or Username wrong!' }] });
      return;
    }

    const userId = userWithPasswordHash.id;

    const token = crypto.randomBytes(80).toString('base64');

    const session = createSession(userId, token);

    const serializedCookie = await serializedSessionTokenCookie(session.token);

    res
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { id: userId } });
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
