import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
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
  return (
    <>
      <h1 className="text-center my-4">Was willst du als nächstes lesen?</h1>
      <div className="flex  justify-center items-center flex-col">
        <input
          className=" border border-black rounded focus:border-blue-400 py-2 px-3 w-2/3 mx-8"
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
        <div className="w-1/4">
          <button
            className="bg-yellow-300 w-full rounded text-black my-4 "
            onClick={() => handleSearch()}
          >
            Suchen
          </button>{' '}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 px-8 ">
          {result.map((item) => {
            return (
              <div
                className="flex justify-center items-center py-4"
                key={item.id}
              >
                <a href={`/books/${item.id}`}>
                  <div className="flex justify-center items-center">
                    {item.volumeInfo.imageLinks !== undefined ? (
                      <img
                        className="rounded"
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
