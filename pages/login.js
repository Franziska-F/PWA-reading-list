import { useRouter } from 'next/router';
import { useState } from 'react';
import NavBar from '../components/NavBar';

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
        <NavBar
          bookList={props.bookList}
          setBookList={props.setBookList}
          user={props.user}
        />
        <h1
          className="text-center text-white text-4xl font-bold leading-10 pt-16
        px-8"
        >
          Remember all those books!
        </h1>

        <svg
          className="bottom-0 left-0 absolute"
          width="100%"
          height="150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#393a4e">
            <animate
              repeatCount="indefinite"
              fill="freeze"
              attributeName="d"
              dur="10s"
              values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z;
        M0 86.3149C316 86.315 444 159.155 884 51.1554C1324 -56.8446 1320.29 34.1214 1538 70.4063C1814 116.407 2156 188.408 2560 86.315V232.317L0 232.316V86.3149Z;
        M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z;

        M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z
        "
            />
          </path>
        </svg>
      </div>
      <div className="bg-main-bg text-white">
        <h2 className="text-center text-xl tracking-wide mb-6 pb-4">Login</h2>
        <div className="flex justify-center items-center flex-col">
          <label className=" mx-4" htmlFor="username">
            Username
          </label>
          <input
            className="border border-black rounded-full text-black m-4 p-2 w-2/4 "
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
            className="border border-black rounded-full text-black m-4 p-2 w-2/4"
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
            className="border bg-btn text-main-bg  rounded-full w-1/4 mt-4 mb-8 "
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
