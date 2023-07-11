import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SearchExpenses from "./components/search/SearchExpenses";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";


function App() {
  const { isLoggedIn } = useAuth();

  

  const pages = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: isLoggedIn ? <Dashboard /> : <Navigate to="/auth/signin" />,
        },
        {
          path: "/auth/signup",
          element: <Signup />,
        },
        {
          path: "/auth/signin",
          element: <Signin />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={pages} />
    </>
  );
}

export default App;
