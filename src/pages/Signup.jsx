import React from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { registerUser } = useAuth();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  // const loginMutation = useMutation((credentials) => registration(credentials));

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password_confirmation = confirmPasswordRef.current.value;

    const userData = {
      name,
      email,
      password,
      password_confirmation,
    };

    registerUser(userData);

    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 -mt-12 lg:-mt-20">
        <div>
          <NavLink to="/">
            <h3 className="text-4xl font-bold text-indigo-800">MONEY NINJA</h3>
          </NavLink>
        </div>
        <div className="w-full px-10 py-8 mt-6 overflow-hidden shadow-md sm:max-w-md rounded-xl">
          <form onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="text"
                  name="name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ref={nameRef}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="email"
                  name="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ref={emailRef}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="password"
                  name="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ref={passwordRef}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="password"
                  name="password_confirmation"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ref={confirmPasswordRef}
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <NavLink
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/auth/signin"
              >
                Already registered?
              </NavLink>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-indigo-600 hover:bg-indigo-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
