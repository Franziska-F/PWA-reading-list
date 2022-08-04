import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Leseliste</h1>

      <Link href="/register">Register</Link>
      <br />
      <Link href="/login">Login</Link>
    </>
  );
}
