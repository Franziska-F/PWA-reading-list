import Link from 'next/link';

export default function RegisterNavBar() {
  return (
    <div className="bg-transparent text-white">
      <div className="flex justify-start  items-center h-14">
        <div className="flex px-4">
          {' '}
          <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
