import { type } from 'os';

export default async function register(req, res) {

  if (req.method === 'POST') {

    if (
      typeof  req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password

    ) {
      res
        .status(400)
        .json({
          errors: [{ message: 'Please choose a username and a password' }],
        });
        return;
    }


    if (await getUserByUserName(req.body.username)) {
      
    }
  }
}