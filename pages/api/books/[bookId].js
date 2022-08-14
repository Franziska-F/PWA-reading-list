import {
  changeBookStatusById,
  deleteBookById,
  getValidUser,
} from '../../../util/database';

export default async function handler(req, res) {
  const user = await getValidUser(req.cookies.sessionToken);
  const bookId = req.query;
  if (req.method === 'DELETE') {
    const deleteBook = await deleteBookById(bookId.bookId, user.id);

    return await res.status(200).json(deleteBook);
  }

  if (req.method === 'PUT') {
    const finishedBook = await changeBookStatusById(bookId.bookId, user.id);
    return await res.status(200).json(finishedBook);
  } else {
    res.status(405).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
