import 'material-react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'material-react-toastify';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { getValidUser } from '../util/database';

toast.configure();
export default function Home(props) {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState([]);

  const addedNotification = () => {
    toast.dark('Added to your bookstack!', {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 4000,
    });
  };

  const notAddedNotification = () => {
    toast.dark('This book is already on your bookstack!', {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 4000,
    });
  };

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
    console.log(onListResponseBody);

    if (onListResponse.status === 400) {
      notAddedNotification();
    } else {
      addedNotification();
    }
    props.displayBookCount();
  }

  return (
    <div className="bg-main-bg text-white min-h-screen pb-8">
      <NavBar
        bookList={props.bookList}
        setBookList={props.setBookList}
        user={props.user}
        readingList="Deine Leseliste"
        finishedBooks="finishedBooks"
        registration="registration"
        search=""
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
                <svg
                  width="12"
                  height="23"
                  viewBox="0 0 58 73"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M55.6733 7.67907C54.6136 7.67907 53.7535 8.53913 53.7535 9.59884V67.1919C53.7535 68.2516 52.8934 69.1116 51.8337 69.1116H9.59884C6.42354 69.1116 3.83954 66.5276 3.83954 63.3523C3.83954 60.177 6.42354 57.593 9.59884 57.593H44.1547C47.33 57.593 49.914 55.009 49.914 51.8337V5.7593C49.914 2.58401 47.33 0 44.1547 0H5.7593C2.58401 0 0 2.58401 0 5.7593V63.3523C0 68.6432 4.30796 72.9512 9.59884 72.9512H51.8337C55.009 72.9512 57.593 70.3672 57.593 67.1919V9.59884C57.593 8.53913 56.733 7.67907 55.6733 7.67907ZM5.7593 3.83954H44.1547C45.2144 3.83954 46.0744 4.69959 46.0744 5.7593V51.8337C46.0744 52.8934 45.2144 53.7535 44.1547 53.7535H9.59884C7.44102 53.7535 5.44446 54.4715 3.83954 55.6771V5.7593C3.83954 4.69959 4.69959 3.83954 5.7593 3.83954Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          );
        })}
        <div>
          <ToastContainer />
        </div>
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
