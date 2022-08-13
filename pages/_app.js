import '../styles/globals.css';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [bookList, setBookList] = useState([]);


    const displayBookCount = useCallback(async () => {
      const bookCountResponse = await fetch('../api/books');

      const bookCountResponseBody = await bookCountResponse.json();
      console.log('test', bookCountResponseBody);
      setBookList(bookCountResponseBody);

  }, []);

   useEffect(() => {
     displayBookCount().catch(() => console.log('fetch fails'));
   }, [displayBookCount]);

  return (
    <Layout bookList={bookList} setBookList={setBookList}>
      {' '}
      <Component
        {...pageProps}
        bookList={bookList}
        setBookList={setBookList}
        displayBookCount={displayBookCount}
      />
    </Layout>
  );
}

export default MyApp;
