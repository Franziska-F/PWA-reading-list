import '../styles/globals.css';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function displayBookCount() {
      const bookCountResponse = await fetch('../api/books');

      const bookCountResponseBody = await bookCountResponse.json();
      console.log('test', bookCountResponseBody);
      setBooks(bookCountResponseBody);
    }
    displayBookCount().catch(() => {
      console.log('Fetch fails');
    });
  }, []);

  // useEffect(() => {
  //   displayBookCount().catch(() => console.log('fetch fails'));
  // }, [displayBookCount]);

  return (
    <Layout books={books}>
      {' '}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
