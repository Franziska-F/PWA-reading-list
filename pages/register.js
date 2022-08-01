export default function Register() {
  return (
    <div className="flex items-center bg-red-400">
      <div className="m-2 p-2">
        <label htmlFor="username"> Username </label>
        <input placeholder="Username" id="username" />
      </div>
      <div className="m-2">
        <label htmlFor="password">Password </label>
        <input placeholder="Password" id="password" type="password" />
      </div>
      <button>Register</button>
    </div>
  );
}
