import { useState } from 'react';
import { getFinishedBooks, getValidUser } from '../util/database';

export default function FinishedBooks(props) {
  const [finishedList, setFinishedList] = useState(props.finishedBooks);

  async function deleteHandler(id) {
    const bookList = await fetch(`../api/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newBookList = await bookList.json();

    const newState = finishedList.filter(
      (item) => item.id !== newBookList.book_id,
    );


    setFinishedList(newState);
  }

  return (
    <div>
      <h1 className="text-center m-4">Gelesene Bücher</h1>
      <div>
        {finishedList.map((item) => {
          return (
            <div key={item.id} className="flex mt-8 overflow-auto">
              {' '}
              {item.volumeInfo.imageLinks !== undefined ? (
                <img
                  className="rounded m-4"
                  src={
                    item.volumeInfo.imageLinks !== undefined
                      ? item.volumeInfo.imageLinks.thumbnail
                      : ''
                  }
                  alt="bookcover"
                />
              ) : (
                <p>No cover available!</p>
              )}
              <div className="p-4">
                <p>{item.volumeInfo.title}</p>
                <p>
                  {item.volumeInfo.authors[0]
                    ? item.volumeInfo.authors[0]
                    : 'Author unknowen'}
                </p>

                <button onClick={() => deleteHandler(item.id)}>❌</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const user = await getValidUser(context.req.cookies.sessionToken);

  const responseBookId = await getFinishedBooks(user.id);

  const bookId = await JSON.parse(JSON.stringify(responseBookId));

  const books = await Promise.all(
    bookId.map(async (item) => {
      const res = await fetch(
        `https://books.googleapis.com/books/v1/volumes/${item.book_id}`,
      );
      return await res.json();
    }),
  );

  if (user) {
    return {
      props: {
        user: user,
        finishedBooks: books,
      },
    };
  }

  return {
    props: {},
  };
}
