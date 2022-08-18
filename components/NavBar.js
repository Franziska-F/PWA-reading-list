import Link from 'next/link';
import { useState } from 'react';

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookCount, setBookCount] = useState(props.bookList);

  // login should only visible when not loged in! 
  return (
    <div className="bg-yellow-600 h-14">
      <div className="hidden md:flex justify-evenly">
        <span>📚</span>
        <span>{bookCount}</span>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
        <Link href="/finishedBooks">Gelesene Bücher</Link>
      </div>
      <div className="flex justify-between relative md:hidden">
        <div>
          {console.log('bookCount', bookCount)}
          <span>📚</span> <span>{props.bookList.length}</span>
        </div>
        <div className="realative">
          <Link href="/readingList">Deine Leseliste</Link>
        </div>
        <button
          className={
            !isOpen
              ? 'hamburger-icon p-4 space-y-2 bg-gray-600 rounded shadow h-14'
              : 'hidden'
          }
          onClick={() => setIsOpen(true)}
        >
          <span className="block w-8 h-0.5 bg-gray-100" />
          <span className="block w-8 h-0.5 bg-gray-100" />
          <span className="block w-8 h-0.5 bg-gray-100" />
        </button>
        <div className={isOpen ? '  ' : 'hidden'}>
          {' '}
          <button
            className="close-icon absolute top-0 right-0  bg-gray-600 h-14 w-14"
            onClick={() => setIsOpen(false)}
          >
            ❌
          </button>
          <div
            className="flex  bg-black/75 absolute right-0 top-14 z-10 text-white h-80 w-80"
            onClick={() => setIsOpen(false)}
          >
            <div className=" flex flex-col p-4 w-full text-center">
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
              <Link href="/logout">Logout</Link>
              <Link href="/">Home</Link>
              <Link href="/finishedBooks">Gelesene Bücher</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
