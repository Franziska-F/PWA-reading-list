import Link from 'next/link';
import { useState } from 'react';

export default function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookCount, setBookCount] = useState(props.bookList);

  // login should only visible when not loged in!
  return (
    <div className="bg-transparent text-white">
      <div className=" hidden md:flex justify-evenly  items-center h-14">
        <div>
          {' '}
          <span className="p-2">📚</span>
          <span>{props.bookList.length}</span>
        </div>
        <Link href="/register">Register</Link>
        {props.user ? (
          <Link href="/logout">Logout</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
        {props.Leseliste ? (
          <Link href="/readingList">Deine Leseliste</Link>
        ) : (
          ''
        )}
        <Link href="/finishedBooks">Gelesene Bücher</Link>
        <Link href="/">Home</Link>
      </div>
      {/* } on small screens {*/}
      <div className="flex justify-between items-center h-14 md:hidden">
        <div>
          <span>📚</span> <span>{props.bookList.length} </span>
        </div>
        <div>
          <Link href="/readingList">{props.Leseliste}</Link>
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
          <div
            className="flex bg-black/75 absolute right-0 -top-4 z-10 text-white h-80 w-80"
            onClick={() => setIsOpen(false)}
          >
            <button
              className="close-icon absolute top-4 right-0 m-4 leading-3 "
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
            <div className=" flex flex-col p-4 mt-8 w-full text-center">
              <Link href="/register">Register</Link>
              {props.user ? (
                <Link href="/logout">Logout</Link>
              ) : (
                <Link href="/login">Login</Link>
              )}

              <Link href="/">Home</Link>
              <Link href="/finishedBooks">Gelesene Bücher</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
