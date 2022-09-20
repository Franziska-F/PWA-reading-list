import {
  getBookByIdAndUserId,
  getBooksToRead,
  getValidUser,
  putBookonList,
} from '../../../util/database';

export default async function bookHandler(req, res) {
  if (req.method === 'GET') {
    const user = await getValidUser(req.cookies.sessionToken);

    if (!user) {
      return res.status(400).json({
        error: 'Session token not valid',
      });
    }

    const allBooksOfUser = await getBooksToRead(user.id);

    return res.status(200).json(allBooksOfUser);
  }
  if (req.method === 'POST') {
    const user = await getValidUser(req.cookies.sessionToken);

    if (!user) {
      return res.status(400).json({
        error: 'Session token not valid',
      });
    }

    const bookId = req.body.bookId;

    const isBook = await getBookByIdAndUserId(bookId, user.id);
    console.log(isBook);
    if (isBook) {
      res.status(400).json({
        errors: [{ message: 'This book is already on your readinglist' }],
      });
      return;
    }

    const createBook = await putBookonList(user.id, bookId);
   
    return res.status(200).json(createBook);
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
