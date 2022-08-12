import { deleteBookById, getValidUser } from '../../../util/database';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const user = await getValidUser(req.cookies.sessionToken);
    const bookId = req.query;

    const deleteBook = await deleteBookById(bookId.bookId, user.id);

    return await res.status(200).json(deleteBook);
  } else {
    res.status(405).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
