import { useState } from 'react';
import NavBar from '../components/NavBar';
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
    <div className="bg-main-bg text-white min-h-screen pb-8">
      <NavBar
        bookList={props.bookList}
        setBookList={props.setBookList}
        user={props.user}
        readingList="readingList"
        finishedBooks=""
        registration=""
      />
      <h1 className="text-center text-2xl m-8">Gelesene Bücher</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 px-8  overlow-auto">
        {finishedList.map((item) => {
          return (
            <div
              key={item.id}
              className="flex justify-center items-center py-4 bg-container rounded-md  shadow-md shadow-[#10111c] hover:scale-105"
            >
              {' '}
              {item.volumeInfo.imageLinks !== undefined ? (
                <img
                  className="rounded m-4"
                  src={item.volumeInfo.imageLinks.thumbnail}
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

                <button
                  className="m-2 hover:scale-110"
                  onClick={() => deleteHandler(item.id)}
                >
                  ❌
                </button>
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
  if (user) {
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

    return {
      props: {
        user: user,
        finishedBooks: books,
      },
    };
  }

  return {
    redirect: {
      destination: `/login`,
      permanent: false,
    },
  };
}
