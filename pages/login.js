import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  async function loginHandler() {
    const loginResponse = fetch('/api/login', {
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
    props.displayBookCount();

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
    <div className="relative">
      <div className="bg-hero-img bg-center bg-cover h-96 relative">
        <h1
          className="text-center text-white text-4xl font-bold leading-10 pt-16
        px-8"
        >
          Remember all those books!
        </h1>

        <svg
          className="w-full h-1/2   bottom-0 left-0 absolute translate-y-6 "
          viewBox="0 0 100% 355"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="red">
            <animate
              repeatCount="indefinite"
              fill="freeze"
              dur="10s"
              attributeName="d"
              values="M0 0C510.236 349.94 1184 0 2217 0V355H0V0Z;
              MO 0.000244141C325.653 232.429 1171.17 67.1622 2217 0.000244141V355H0V0.000244141Z;
              M0 16.4112C223.574 -92.0714 1724.89 386.76 2217 16.4112V371.411H0V16.4112Z;
              M0 0C510.236 349.94 1184 0 2217 0V355H0V0Z"
            />
          </path>
        </svg>
      </div>
      <div>
        <h2 className="text-center m-8">Login</h2>
        <div className="flex justify-center items-center flex-col">
          <label className=" mx-4" htmlFor="username">
            Username
          </label>
          <input
            className="border border-black m-4 w-2/3"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          />

          <label className="mx-4" htmlFor="password">
            Password
          </label>
          <input
            className="border border-black m-4 w-2/3"
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center  ">
          <button
            className="border border-black w-1/2 mt-4"
            onClick={() =>
              loginHandler().catch(() => {
                console.log('Login failed');
              })
            }
          >
            Login
          </button>
        </div>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </div>
  );
}
