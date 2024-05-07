import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error message when email changes
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are correct
    if (email === "email@gmail.com" && password === "password") {
      // Navigate to success page or do something on successful login
      navigate("/home");
    } else {
      // Set error message for incorrect login
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="w-450 mx-auto mt-10 mb-6 p-[3rem] bg-primary-bg rounded-lg shadow-md font-mono">
        <h2 className="text-3xl font-railextra mb-5 text-primary-darkblue">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-lg font-railmedium text-black">

              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full px-3 py-2 font-railregular border-2 rounded-md  border-primary-blue  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-railmedium text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-3 py-2 font-railregular border-2 rounded-md  border-primary-blue  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn larger my-2 ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
