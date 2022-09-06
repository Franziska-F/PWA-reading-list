import Link from 'next/link';
import { useState } from 'react';

export default function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  // login should only visible when not loged in!
  return (
    <div className="bg-transparent text-white">
      <div className=" hidden md:flex justify-evenly  items-center h-14">
        <div className="flex">
          {' '}
          <span className="p-2">
            <svg
              width="28"
              height="17"
              viewBox="0 0 58 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M53.9935 9.78002V7.26032C49.8216 3.07403 44.1523 0.385153 37.853 0.0647918C37.4499 0.021597 37.0539 0 36.6508 0C33.5047 0 30.6863 1.41823 28.8073 3.64636C26.806 1.42543 23.9227 0.0215971 20.7119 0.0215971C20.3879 0.0215971 20.0712 0.0359952 19.7544 0.0647918C13.4408 0.385153 7.76786 3.07403 3.59956 7.26032V9.78002L0 10.8599V46.8555L24.1171 41.8161L25.197 43.256H32.3961L33.476 41.8161L57.593 46.8555V10.8599L53.9935 9.78002ZM19.7256 33.5731C15.1362 33.7063 10.8455 34.8618 7.03355 36.82L7.19913 8.77214C10.3847 5.7665 14.6358 3.85873 19.3261 3.66076C22.2273 3.85513 24.8478 4.75143 27.0975 6.18405L27.0291 34.509C25.0314 33.9115 22.7349 33.5659 20.3555 33.5659C20.1324 33.5659 19.9092 33.5695 19.6896 33.5767L19.7256 33.5731ZM50.3939 36.7408C46.7475 34.8618 42.4569 33.7063 37.9106 33.5731C37.709 33.5695 37.5219 33.5659 37.3311 33.5659C34.9554 33.5659 32.6625 33.9115 30.4955 34.5522L30.6647 6.10846C32.828 4.73703 35.4233 3.85153 38.2094 3.66436C42.9752 3.86233 47.2119 5.7737 50.3975 8.78294L50.3867 36.7444L50.3939 36.7408Z"
                fill="white"
              />
            </svg>
          </span>
          <span className="p-1 ">{props.bookList.length}</span>
        </div>
        {props.user ? (
          <Link href="/logout">Logout</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
        {props.search ? <Link href="/">Suche</Link> : ''}
        {props.readingList ? (
          <Link href="/readingList">Deine Leseliste</Link>
        ) : (
          ''
        )}
        {props.finishedBooks ? (
          <Link href="/finishedBooks">Gelesene Bücher</Link>
        ) : (
          ''
        )}
      </div>
      {/* } on small screens {*/}
      <div className="flex justify-between items-center h-14 pl-8 pr-5 md:hidden">
        <div className="flex">
          {' '}
          <span className="p-2">
            <svg
              width="28"
              height="17"
              viewBox="0 0 58 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M53.9935 9.78002V7.26032C49.8216 3.07403 44.1523 0.385153 37.853 0.0647918C37.4499 0.021597 37.0539 0 36.6508 0C33.5047 0 30.6863 1.41823 28.8073 3.64636C26.806 1.42543 23.9227 0.0215971 20.7119 0.0215971C20.3879 0.0215971 20.0712 0.0359952 19.7544 0.0647918C13.4408 0.385153 7.76786 3.07403 3.59956 7.26032V9.78002L0 10.8599V46.8555L24.1171 41.8161L25.197 43.256H32.3961L33.476 41.8161L57.593 46.8555V10.8599L53.9935 9.78002ZM19.7256 33.5731C15.1362 33.7063 10.8455 34.8618 7.03355 36.82L7.19913 8.77214C10.3847 5.7665 14.6358 3.85873 19.3261 3.66076C22.2273 3.85513 24.8478 4.75143 27.0975 6.18405L27.0291 34.509C25.0314 33.9115 22.7349 33.5659 20.3555 33.5659C20.1324 33.5659 19.9092 33.5695 19.6896 33.5767L19.7256 33.5731ZM50.3939 36.7408C46.7475 34.8618 42.4569 33.7063 37.9106 33.5731C37.709 33.5695 37.5219 33.5659 37.3311 33.5659C34.9554 33.5659 32.6625 33.9115 30.4955 34.5522L30.6647 6.10846C32.828 4.73703 35.4233 3.85153 38.2094 3.66436C42.9752 3.86233 47.2119 5.7737 50.3975 8.78294L50.3867 36.7444L50.3939 36.7408Z"
                fill="white"
              />
            </svg>
          </span>
          <span className="p-1 ">{props.bookList.length}</span>
        </div>
        <div>
          <Link href="/readingList">{props.readingList}</Link>
        </div>
        <div>
          <button
            className={
              !isOpen
                ? 'hamburger-icon  space-y-2  rounded  h-14 w-14'
                : 'hidden'
            }
            onClick={() => setIsOpen(true)}
          >
            {/* } Hamburger icon {*/}
            <span className="block w-8 h-0.5 bg-white" />
            <span className="block w-8 h-0.5 bg-white" />
            <span className="block w-8 h-0.5 bg-white" />
          </button>
        </div>
        <div className={isOpen ? '  ' : 'hidden'}>
          {' '}
          {/* } Open menue {*/}
          <div className="flex bg-black/75 absolute right-0 -top-4 z-10 text-white h-80 w-80">
            <button
              className="close-icon absolute top-4 right-0 m-4 leading-3 "
              onClick={() => setIsOpen(false)}
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
            <div className=" flex flex-col p-4 mt-8 w-full text-center">
              {props.user ? (
                <Link href="/logout">Logout</Link>
              ) : (
                <Link href="/login">Login</Link>
              )}
              {props.search ? <Link href="/">Suche</Link> : ''}
              {props.readingList ? (
                <Link href="/readingList">Deine Leseliste</Link>
              ) : (
                ''
              )}
              {props.finishedBooks ? (
                <Link href="/finishedBooks">Gelesene Bücher</Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
