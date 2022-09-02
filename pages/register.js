import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const registerResponseBody = await registerResponse.json();
    console.log(registerResponseBody);
    setPassword('');
    setUsername('');

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return;
    }
  }

  return (
    <div className="bg-main-bg text-white min-h-screen pb-8 px-8">
      <NavBar
        bookList=""
        setBookList=""
        user={props.user}
        readingList=""
        finishedBooks=""
        registration=""
      />

      {/* } Container for registration {*/}
      <div className="bg-container rounded-md shadow-md shadow-[#10111c]  flex justify-center items-center flex-col">
        <h1 className="text-center text-2xl tracking-wide mb-6 pb-4 mt-8">
          Register
        </h1>
        <label htmlFor="username"> Username </label>
        <input
          className="border border-black rounded-full text-black m-4 p-2 w-2/4"
          placeholder="Username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />

        <label htmlFor="password">Password </label>
        <input
          className="border border-black rounded-full text-black m-4 p-2 w-2/4"
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />

        <button
          className=" bg-gradient-to-l from-btn
            text-white  rounded-full w-1/4 p-2 mt-4 mb-8 hover:scale-110"
          onClick={() => {
            registerHandler().catch(() => {
              console.log('Registration failed');
            });
          }}
        >
          Register
        </button>
        {errors.length
          ? errors.map((error) => (
              <span key={`error-${error.message}`}>{error.message}</span>
            ))
          : ''}
      </div>
    </div>
  );
}
