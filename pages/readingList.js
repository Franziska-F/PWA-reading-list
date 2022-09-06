import { useState } from 'react';
import NavBar from '../components/NavBar';
import { getBooksToRead, getValidUser } from '../util/database';

export default function ReadingList(props) {
  const [list, setList] = useState(props.books);

  async function deleteHandler(id) {
    const bookList = await fetch(`../api/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newBookList = await bookList.json();

    const newState = list.filter((item) => item.id !== newBookList.book_id);

    setList(newState);

    props.setBookList(newState);
  }

  async function doneHandler(id) {
    const doneBookAnswer = await fetch(`../api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    const doneBook = await doneBookAnswer.json();

    const newState = list.filter((item) => item.id !== doneBook.book_id);

    setList(newState);
    props.displayBookCount();
  }

  return (
    <div className="bg-main-bg text-white min-h-screen">
      <div>
        <NavBar
          bookList={props.bookList}
          setBookList={props.setBookList}
          user={props.user}
          readingList=""
          finishedBooks="finishedBooks"
          registration=""
          search="search"
        />
      </div>
      <h1 className="text-center text-2xl m-8 ">Deine Leseliste</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 px-8  overlow-auto">
        {list.map((item) => {
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
                  className="rounded-md text-black m-2 p-1 bg-gradient-to-l from-btn hover:scale-110"
                  onClick={() =>
                    doneHandler(item.id).catch(() => {
                      console.log('PUT request failed');
                    })
                  }
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 58 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 32.4323L5.08756 27.3447L18.0043 40.2579L52.5055 5.75678L57.593 10.8443L18.0007 50.433L0 32.4323Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button
                  className="rounded-md text-black m-2 p-1 bg-gradient-to-l from-btn hover:scale-110"
                  onClick={() => deleteHandler(item.id)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 67 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5L62.593 62.593M5 62.593L62.593 5"
                      stroke="white"
                      strokeWidth="8.22758"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
  // const readingListHeader = context;
  // console.log('params', readingListHeader);
  if (user) {
    const responseBookId = await getBooksToRead(user.id);

    const bookId = await JSON.parse(JSON.stringify(responseBookId));

    const test = await Promise.all(
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
        books: test,
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
