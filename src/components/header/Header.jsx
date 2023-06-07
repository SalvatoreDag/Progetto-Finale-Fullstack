import React from "react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.svg"

function Header() {
  const navRef = useRef();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm"
        onClick={toggleSidebar}
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <ul class="space-y-2 font-medium text-indigo-900">
            <li >
              <a
                href="#"
                className="flex flex-col items-center p-2 rounded-lg "
                onClick={closeSidebar}
              >
               <img className="w-14 h-14 transition duration-75 md:w-20 md:h-20" src={logo}/>
                <span class="flex-1 ml-3 whitespace-nowrap">MONEY NINJA</span>
              </a>
            </li>
            <li>
              <NavLink to="/" activeClassName="activeLink" className="flex items-center p-2 rounded-lg hover:bg-gray-100 " onClick={toggleSidebar}>
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" activeClassName="activeLink" className="flex items-center p-2 rounded-lg hover:bg-gray-100" onClick={toggleSidebar}>
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="#"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/signin"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/signup"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Header;

