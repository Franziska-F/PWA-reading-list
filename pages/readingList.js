import { useEffect, useState } from 'react';
import { getBooksToRead, getValidUser } from '../util/database';

export default function ReadingList(props) {
  const [list, setList] = useState([]);

 // useEffect(() => {
 //   const test = async () => {
 //     await props.books.map(async (item) => {
 //       const res = await fetch(
 //         `https://books.googleapis.com/books/v1/volumes/${item.book_id}`,
 //       );
 //       const data = await res.json();
 //       console.log(res);
 //       setList(data);
 //     });
 //   };

  //   test().catch(() => {
  //     console.log('error');
  //   });
  // }, [props.books]);

  return (
    <div>
      <h1>Deine Leseliste</h1>
      {console.log(props.test)}
      {list.map((item) => {
        return <p key={item.volumeInfo.title}>{item.volumeInfo.title}</p>;
      })}
    </div>
  );
}
export async function getServerSideProps(context) {
  const user = await getValidUser(context.req.cookies.sessionToken);

  const responseBookId = await getBooksToRead(user.id);

  const bookId = await JSON.parse(JSON.stringify(responseBookId));

  console.log(bookId);

  const responses = await Promise.all(
    bookId.map(async (item) => {
      const res = await fetch(
        `https://books.googleapis.com/books/v1/volumes/${item.book_id}`,
      ); // Send request for each id
    }),
  );

  // console.log(responses);

  if (user) {
    return {
      props: {
        user: user,
        books: bookId,
      },
    };
  }

  return {
    props: { books: bookId },
  };
}
