import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  async function loginHandler() {
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

    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) &&
      // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      await router.push(returnTo);
    } else {
      await router.push(`/`);
    }
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
