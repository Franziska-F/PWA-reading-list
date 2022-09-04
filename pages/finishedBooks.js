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
                <div className="flex">
                  <button
                    className="rounded-md m-2 p-1 bg-gradient-to-l from-btn hover:scale-110"
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

                  <a
                    className="rounded-md  m-2 p-1  bg-gradient-to-l from-btn hover:scale-110"
                    href={`mailto:?subject=Buchempfehlung&body=https://play.google.com/store/books/details?id=${item.id}`}
                  >
                    <svg
                      className="inline"
                      width="28"
                      height="15"
                      viewBox="0 0 58 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M57.5903 2.16232C57.5894 2.12136 57.5873 2.08046 57.5841 2.03963C57.5815 2.0063 57.5783 1.9732 57.5742 1.94032C57.5695 1.90206 57.5636 1.864 57.5568 1.82594C57.5507 1.79161 57.5441 1.75753 57.5365 1.7238C57.5283 1.6877 57.5188 1.65194 57.5088 1.61625C57.4992 1.58211 57.4893 1.54831 57.4782 1.51491C57.4666 1.48002 57.4536 1.44569 57.4403 1.41135C57.4275 1.3785 57.4144 1.34598 57.4002 1.31401C57.3851 1.28021 57.3687 1.24701 57.352 1.21389C57.336 1.18246 57.3197 1.15136 57.3024 1.1208C57.2842 1.08924 57.2652 1.05821 57.2456 1.02731C57.2257 0.996152 57.2053 0.965595 57.1839 0.935513C57.1639 0.90719 57.1429 0.879407 57.1215 0.851826C57.0971 0.820797 57.072 0.790633 57.0461 0.76097C57.034 0.746976 57.0234 0.732105 57.0109 0.718329C57.0002 0.7067 56.9884 0.696832 56.9776 0.685477C56.9508 0.657489 56.9231 0.630517 56.8949 0.603949C56.8688 0.579411 56.8427 0.555141 56.8156 0.532024C56.789 0.509241 56.7615 0.487611 56.7337 0.466124C56.7035 0.442666 56.6734 0.419344 56.6422 0.397646C56.615 0.378718 56.587 0.361208 56.559 0.343564C56.5262 0.322745 56.4934 0.302059 56.4598 0.283203C56.4302 0.266576 56.3998 0.251637 56.3693 0.236358C56.3362 0.219728 56.3032 0.203029 56.2694 0.188227C56.236 0.173488 56.2018 0.160646 56.1676 0.147524C56.1353 0.135222 56.1031 0.122718 56.0704 0.111969C56.0343 0.100063 55.9974 0.0901328 55.9606 0.0800595C55.928 0.0712711 55.8957 0.0622804 55.8629 0.0549123C55.8262 0.046733 55.7889 0.040312 55.7516 0.0339574C55.7167 0.028007 55.682 0.0221958 55.647 0.0179372C55.6117 0.0136787 55.5763 0.0108372 55.5406 0.00827044C55.502 0.00542955 55.4634 0.00319841 55.4247 0.00238713C55.409 0.00202717 55.3937 0 55.3779 0H2.21512C2.20024 0 2.18591 0.0019605 2.17104 0.00223186C2.13021 0.00304314 2.08938 0.0053411 2.04869 0.00838134C2.01502 0.0109509 1.98163 0.0135871 1.9485 0.0175771C1.91132 0.0220377 1.87441 0.0281208 1.83737 0.0345447C1.80208 0.0406362 1.76679 0.0466447 1.73218 0.0544169C1.69729 0.062192 1.66296 0.0716559 1.62835 0.08112C1.59346 0.0907198 1.55859 0.100115 1.52438 0.111337C1.48977 0.12269 1.45571 0.135876 1.42149 0.148995C1.38918 0.161433 1.35673 0.173599 1.32509 0.187457C1.28981 0.202938 1.25532 0.220379 1.22071 0.23782C1.19163 0.25242 1.16256 0.266684 1.13432 0.282503C1.09971 0.301904 1.06591 0.323205 1.03211 0.344628C1.00507 0.361795 0.977755 0.378832 0.951531 0.397154C0.919761 0.419192 0.88907 0.44284 0.85838 0.46678C0.831068 0.48794 0.804029 0.509167 0.777805 0.531609C0.750495 0.554931 0.72413 0.579469 0.697631 0.604414C0.669646 0.630779 0.642201 0.657549 0.615565 0.685332C0.604749 0.696756 0.592859 0.706694 0.582171 0.718321C0.569598 0.73211 0.559051 0.746981 0.546885 0.760962C0.521062 0.790639 0.495915 0.82079 0.471571 0.851818C0.450076 0.879399 0.429118 0.907196 0.40911 0.935505C0.387748 0.965586 0.367333 0.996143 0.347458 1.0273C0.327854 1.0582 0.30879 1.08923 0.290673 1.1208C0.273368 1.15135 0.257009 1.18245 0.241057 1.21388C0.224292 1.24701 0.207933 1.2802 0.19279 1.314C0.178594 1.34597 0.16548 1.37849 0.152771 1.41134C0.139386 1.44568 0.126406 1.48001 0.114779 1.5149C0.103703 1.54829 0.0938241 1.5821 0.0842243 1.61624C0.0742203 1.65193 0.0647563 1.68769 0.0565078 1.72379C0.0489376 1.75752 0.0423116 1.7916 0.0362283 1.82594C0.0294694 1.86399 0.0235192 1.90205 0.0187843 1.94032C0.0147233 1.97324 0.0114337 2.00634 0.00891581 2.03962C0.00567066 2.08052 0.00359795 2.12142 0.00269713 2.16231C0.00229841 2.18003 0 2.19727 0 2.21512V39.8721C0.0013433 41.0467 0.46853 42.1727 1.29907 43.0033C2.12961 43.8338 3.25567 44.301 4.43023 44.3023H53.1628C54.3374 44.301 55.4634 43.8338 56.294 43.0033C57.1245 42.1727 57.5917 41.0467 57.593 39.8721V2.21512C57.593 2.19727 57.5907 2.18003 57.5903 2.16232ZM4.43023 7.25071L20.6853 22.1512L4.43023 37.0517V7.25071ZM32.1585 20.4946L32.1569 20.4961L28.7965 23.5764L7.90987 4.43023H49.6832L32.1585 20.4946ZM23.9637 25.1563L27.2996 28.2143C27.7082 28.5888 28.2423 28.7965 28.7965 28.7965C29.3508 28.7965 29.8849 28.5888 30.2935 28.2143L33.6295 25.1563L49.6832 39.8721H7.91001L23.9637 25.1563ZM36.9077 22.1512L53.1632 7.2503L53.1654 37.0538L36.9077 22.1512Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
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
