import {
  getBooksToRead,
  getValidUser,
  putBookonList,
} from '../../../util/database';

export default async function bookHandler(req, res) {
  if (req.method === 'GET') {
    const user = await getValidUser(req.cookies.sessionToken);

    const allBooksOfUser = await getBooksToRead(user.id);

    console.log('API', allBooksOfUser);
    return res.status(200).json(allBooksOfUser);
  }
  if (req.method === 'POST') {
    const user = await getValidUser(req.cookies.sessionToken);

    const bookId = req.body.bookId;

    const createBook = await putBookonList(user.id, bookId);
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
