import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-yellow-600 static max-h-14">
      <div className="hidden md:flex justify-evenly">
        <span>📚</span>12
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
      </div>
      <div className="flex justify-between static md:hidden">
        <div>
          <span>📚</span>12
        </div>
        <div>
          <Link href="/readingList">Deine Leseliste</Link>
        </div>
        <button
          className={
           ! isOpen
              ? 'hamburger-icon p-4 space-y-2 bg-gray-600 rounded shadow'
              : 'hidden'
          }
          onClick={() => setIsOpen(true)}
        >
          <span className="block w-8 h-0.5 bg-gray-100" />
          <span className="block w-8 h-0.5 bg-gray-100" />
          <span className="block w-8 h-0.5 bg-gray-100" />
        </button>
        <div className={isOpen ? '' : 'hidden'}>
          {' '}
          <button
            className="close-icon absolute top-0 right-0 px-8 py-8"
            onClick={() => setIsOpen(false)}
          >
            ❌
          </button>
          <div className="flex flex-col absolut bg-black z-10 text-white h-80 w-80">
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
            <Link href="/logout">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
