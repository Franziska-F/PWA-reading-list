import {
  changeBookStatusById,
  deleteBookById,
  deleteFinishedBookById,
  getBookByBookId,
  getValidUser,
} from '../../../util/database';

export default async function handler(req, res) {
  const user = await getValidUser(req.cookies.sessionToken);
  const bookId = req.query;

  if (req.method === 'DELETE') {
    const currentBook = await getBookByBookId(bookId.bookId);
 

    if (currentBook.length) {
      const deleteBook = await deleteBookById(bookId.bookId, user.id);

      return await res.status(200).json(deleteBook);
    } else {
      const finishedBook = await deleteFinishedBookById(bookId.bookId, user.id);
      return await res.status(200).json(finishedBook);
    }
  }

  if (req.method === 'PUT') {
    const finishedBook = await changeBookStatusById(bookId.bookId, user.id);
    return await res.status(200).json(finishedBook);
  } else {
    res.status(405).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
