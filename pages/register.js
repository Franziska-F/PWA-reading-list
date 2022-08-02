import { useState } from 'react';

export default function Register() {
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
    <div className="flex items-center bg-red-400">
      <div className="m-2 p-2">
        <label htmlFor="username"> Username </label>
        <input
          placeholder="Username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </div>
      <div className="m-2">
        <label htmlFor="password">Password </label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </div>
      <button
        onClick={() => {
          registerHandler();
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
  );
}
