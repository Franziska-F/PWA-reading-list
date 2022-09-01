import Link from 'next/link';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { getValidUser } from '../util/database';

export default function Home(props) {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState([]);

  function handleSearch() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
      .then((res) =>
        res.json().then((response) => {
          const bookInfo = response.items;

          setResult(bookInfo);
        }),
      )
      .catch(() => {
        console.log('error');
      });
  }
  async function putOnList(bookId) {
    const onListResponse = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: bookId,
      }),
    });

    const onListResponseBody = await onListResponse.json();

    console.log('book', onListResponseBody);
    props.displayBookCount();
  }

  return (
    <div className="bg-main-bg text-white min-h-screen pb-8">
      <NavBar
        bookList={props.bookList}
        setBookList={props.setBookList}
        user={props.user}
        Leseliste="Leseliste"
      />
      <div className="bg-container py-8 mx-8 mb-8 rounded-md shadow-md shadow-[#10111c]">
        <h1 className="text-center mt-14 mb-12 text-2xl">
          Was willst du als nächstes lesen?
        </h1>
        <div className="flex  justify-center items-center flex-col">
          <input
            className=" border border-black rounded-full focus:border-blue-400 py-2 px-3 w-2/3 mx-8 -z-1 text-black"
            value={title}
            onChange={(event) => {
              setTitle(event.currentTarget.value);
            }}
          />
          <div className="w-1/4 mt-8">
            <button
              className=" w-full rounded-full text-white p-2 my-4 bg-gradient-to-l from-btn hover:scale-110"
              onClick={() => handleSearch()}
            >
              Suchen
            </button>{' '}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 px-8  overlow-auto">
        {result.map((item) => {
          return (
            <div
              className="flex justify-center items-center py-4 bg-container rounded-md  shadow-md shadow-[#10111c] hover:scale-105"
              key={item.id}
            >
              <a href={`/books/${item.id}`}>
                <div className="flex justify-center items-center">
                  {item.volumeInfo.imageLinks !== undefined ? (
                    <img
                      className="rounded"
                      src={item.volumeInfo.imageLinks.thumbnail}
                      alt="bookcover"
                    />
                  ) : (
                    <p>No cover available!</p>
                  )}
                </div>
                <div className="my-4 text-center">
                  <p>{item.volumeInfo.title}</p>
                  <p>
                    {item.volumeInfo.authors
                      ? item.volumeInfo.authors[0]
                      : 'Unknowen'}
                  </p>
                </div>
              </a>
              <button
                className="rounded-md text-black m-4 p-2 px-4 bg-gradient-to-l from-btn hover:scale-110"
                onClick={() => putOnList(item.id)}
              >
                📚
              </button>
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
    return {
      props: {
        user: user,
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
