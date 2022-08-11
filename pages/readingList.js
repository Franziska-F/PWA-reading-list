import { useEffect, useState } from 'react';
import { getBooksToRead, getValidUser } from '../util/database';

export default function ReadingList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    //   async function test() {
    //     await props.books.map(async (item) => {
    //       const res = await fetch(
    //         `https://books.googleapis.com/books/v1/volumes/${item.book_id}`,
    //       ); // Send request for each id
    //       const data = await res.json();
    //       console.log(data.volumeInfo.title);
    //       setList(data.volumeInfo.title);
    //       console.log('list', list);
    //     });
    //   }
    //   test();
  }, [props.books]);

  return (
    <div>
      <h1 className="text-center m-4">Deine Leseliste</h1>
      <div>
        {props.books.map((item) => {
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
                <button className="p-2 m-2 rounded">🐝</button>
                <button>❌</button>
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

  const responseBookId = await getBooksToRead(user.id);

  const bookId = await JSON.parse(JSON.stringify(responseBookId));

  console.log(bookId);

  const test = await Promise.all(
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
        books: test,
      },
    };
  }

  return {
    props: {},
  };
}
