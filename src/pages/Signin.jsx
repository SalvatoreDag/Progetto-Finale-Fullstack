import React from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { login } from "../utilis/api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Signin() {
  const { loginUser } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      email,
      password,
    };

    loginUser(userData);

    //reset values
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };



  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 -mt-12 lg:-mt-20">
        <div>
          <NavLink to="/">
            <h3 className="text-4xl text-center font-bold text-indigo-800">
              LOGO
            </h3>
          </NavLink>
          <NavLink
            className="text-sm text-center text-gray-600 hover:text-gray-900"
            to="/auth/signup"
          >
            Don't have any account yet?{" "}
            <span className="underline">Sign Up</span>
          </NavLink>
        </div>
        <div className="w-full px-10 py-8 mt-6 overflow-hidden shadow-md sm:max-w-md rounded-xl">
          <form onSubmit={handleSubmit} action="api/login" method="POST">
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
            <div className="flex items-center justify-end mt-4">
              <button 
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-indigo-600 hover:bg-indigo-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
