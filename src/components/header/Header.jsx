import React from "react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.svg";
import { useQuery } from "@tanstack/react-query";
import { ClientQuery } from "../../query/ClientQuery";
import { AiOutlineHome } from "react-icons/ai";
import { CiLogin, CiLogout } from "react-icons/ci";
import { GoPersonAdd } from "react-icons/go";
import { BsGraphUp } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

function Header() {
  const { logoutUser } = ClientQuery();

  const { data: userName } = useQuery(["userName"], null);
  const { data: isLoggedIn } = useQuery(["isLoggedIn"], null);

  const accessToken =
    sessionStorage.getItem("accessToken") || localStorage.getItem("token");

  const navRef = useRef();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleLogout = (e) => {
    const userData = {
      accessToken,
    };

    logoutUser(userData.accessToken);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars />
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <ul className="space-y-2 font-medium text-indigo-900">
            <li>
              <a
                href="#"
                className="flex flex-col items-center p-2 rounded-lg "
                onClick={closeSidebar}
              >
                <img
                  className="w-14 h-14 transition duration-75 md:w-20 md:h-20"
                  src={logo}
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  MONEY NINJA
                </span>
              </a>
            </li>
            {isLoggedIn && (
              <li>
                <a
                  href="#"
                  className="flex flex-col items-center p-2 rounded-lg "
                  onClick={closeSidebar}
                >
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Welcome Back, {userName}
                  </span>
                </a>
              </li>
            )}
            <li>
              <NavLink
                to="/"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 "
                onClick={toggleSidebar}
              >
                <AiOutlineHome />
                <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
              </NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                  onClick={toggleSidebar}
                >
                  <BsGraphUp />
                  <span className="ml-3">Dashboard</span>
                </NavLink>
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <NavLink
                  to="/auth/signin"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                  onClick={toggleSidebar}
                >
                  <CiLogin />
                  <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink
                  to="/auth/signup"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                  onClick={toggleSidebar}
                >
                  <GoPersonAdd />
                  <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button
                  to="/"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100 lg:w-full"
                  onClick={() => {
                    toggleSidebar();
                    toggleLogout();
                  }}
                >
                  <CiLogout />
                  <span className=" ml-3 whitespace-nowrap">Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Header;
