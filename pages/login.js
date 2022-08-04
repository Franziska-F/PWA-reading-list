import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  async function loginHandler(username, password) {
    const loginResponse = fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const loginResponseBody = (await loginResponse).json();

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return;
    }

    // return to is missing
  }

  return (
    <div>
      <h1>Login</h1>

      <label htmlFor="username">Username</label>
      <input
        id="username"
        placeholder="Username"
        className="border border-black"
        value={username}
        onChange={(event) => {
          setUsername(event.currentTarget.value);
        }}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        placeholder="Password"
        type="password"
        className="border border-black"
        value={password}
        onChange={(event) => {
          setPassword(event.currentTarget.value);
        }}
      />
      <button
        onClick={() =>
          loginHandler().catch(() => {
            console.log('Login failed');
          })
        }
      >
        Login
      </button>
      {errors.map((error) => (
        <div key={`error-${error.message}`}>{error.message}</div>
      ))}
    </div>
  );
}
