import { getValidUser, putBookonList } from '../../../util/database';

export default async function bookHandler(req, res) {
  if (req.method === 'POST') {
    const user = await getValidUser(req.cookies.sessionToken);
   
    const bookId = req.body.bookId;

    const createBook = await putBookonList(user.id, bookId);
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
