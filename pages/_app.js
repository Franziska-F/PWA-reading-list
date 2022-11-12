import '../styles/globals.css';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [bookList, setBookList] = useState([]);

  const displayBookCount = useCallback(async () => {
    const bookCountResponse = await fetch('../api/books');

    const bookCountResponseBody = await bookCountResponse.json();

    setBookList(bookCountResponseBody);
  }, []);

  useEffect(() => {
    displayBookCount().catch(() => console.log('fetch fails'));
    console.log('Use Effect try');
  }, [displayBookCount]);

  return (
    <Layout bookList={bookList} setBookList={setBookList}>
      <Head>
        <>
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/img/pwa-icon-128x128.png"
            type="image/png"
            sizes="128x128"
          />
          <link
            href="/img/pwa-icon-144x144.png"
            type="image/png"
            sizes="144x144"
          />

          <link rel="apple-touch-icon" href="/apple-icon.png" />
        </>
      </Head>{' '}
      <Component
        bookList={bookList}
        setBookList={setBookList}
        displayBookCount={displayBookCount}
        {...pageProps}
      />
    </Layout>
  );
}

export default MyApp;
