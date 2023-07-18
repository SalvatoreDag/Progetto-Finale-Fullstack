import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./components/loading/Loading";

function App() {
  const { isLoggedIn, getUserByToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      const data = {
        token,
      };
      getUserByToken(data).then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
          element: !isLoggedIn ? <Signin /> : <Navigate to="/dashboard" />,
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
