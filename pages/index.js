import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  return (
    <>
      <h1 className="text-center my-4">Was willst du als nächstes lesen?</h1>
      <div className="flex  justify-center items-center flex-col">
        <input
          className=" border border-black rounded focus:border-blue-400 py-2 px-3 w-2/3 mx-8"
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
        <div className="w-1/4">
          <button className="bg-yellow-300 w-full rounded text-black my-4 ">
            Suchen
          </button>{' '}
        </div>
      </div>
    </>
  );
}
