import Link from 'next/link';

export default function Header() {
  return (
    <div className="bg-yellow-600">
      <div className="flex justify-evenly">
        <Link href="/register">Register</Link>

        <Link href="/login">Login</Link>
        <Link href="/readingList">Deine Leseliste</Link>
        <Link href="/logout">Logout</Link>
      </div>
    </div>
  );
}
