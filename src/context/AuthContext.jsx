import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  registration,
  logout,
  getExpenses,
  searchExpenses,
  expensesByMonth,
  destroyExpenses,
  updateExpenses,
  storeExpenses,
  getUser,
} from "../utilis/api";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState(null);
  // const cookies = new Cookies();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [success, setSuccess] = useState(false);

  

  const getUserByTokenMutation = useMutation(getUser, {
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setUserName(data.data.name)
      setUserId(data.data.id)
      const token = localStorage.getItem('accessToken')
      setAccessToken(token)
    },
    onError: (error) => {
      console.error(
        "Errore durante il recuper del token:",
        error.response.data
      );
    },
  });

  const getUserByToken = async (token) => {
    try {
      await getUserByTokenMutation.mutateAsync(token);
    } catch (error) {
      console.error("error");
    }
  };

  const registerMutation = useMutation(registration, {
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error) => {
      console.error("Errore durante il login:", error.response.data);
    },
  });

  const registerUser = async (userData) => {
    try {
      await registerMutation.mutateAsync(userData);
    } catch (error) {
      console.error("error");
    }
  };

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      setAccessToken(data.data.token);
      const token = data.data.token;
      setUserId(data.data.user.id);
      setUserName(data.data.user.name);
      setIsLoggedIn(true);
      console.log(token);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("isLoggedIn", true);
      // localStorage.setItem('isLoggedIn', true);
    },
    onError: (error) => {
      console.error("errore duarente il login:", error.response.data);
    },
  });

  const loginUser = async (userData) => {
    try {
      await loginMutation.mutateAsync(userData);
    } catch (error) {
      console.error("errore durante il login");
    }
  };

  const logoutMutation = useMutation(logout, {
    onSuccess: (data) => {
      setAccessToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken");
      console.log("logout effettuato");
    },
    onError: (error) => {
      console.error("errore duarente il logout:", error.response.data);
    },
  });

  const logoutUser = async (accessToken) => {
    try {
      await logoutMutation.mutateAsync(accessToken);
    } catch (error) {
      console.error("errore durante il logout");
    }
  };

  const expensesMutation = useMutation(getExpenses, {
    onSuccess: (data) => {
      setExpenses(data);
      //  console.log(expenses);
    },
    onError: (error) => {
      console.error("errore nel caricamento delle spese:", error.response.data);
    },
  });

  const userExpenses = async (data) => {
    try {
      await expensesMutation.mutateAsync(data);
    } catch (error) {
      console.error("errore");
    }
  };
  const expensesSearchMutation = useMutation(searchExpenses, {
    onSuccess: (data) => {
      setSearchData(data);
    },
    onError: (error) => {
      console.error("errore nel caricamento delle spese:", error.response.data);
    },
  });

  const userExpensesSearch = async (data) => {
    try {
      await expensesSearchMutation.mutateAsync(data);
    } catch (error) {
      console.error("errore");
    }
  };

  const expensesByMonthMutation = useMutation(expensesByMonth, {
    onSuccess: (data) => {
      setMonthData(data);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("errore nel caricamento delle spese:", error.response.data);
    },
  });

  const userExpensesByMonth = async (data) => {
    try {
      setIsLoading(true);
      await expensesByMonthMutation.mutateAsync(data);
    } catch (error) {
      console.error("errore");
    }
  };

  const destroyUserExpensesMuation = useMutation(destroyExpenses, {
    onSuccess: (data) => {
      setReload(true);
    },
    onError: (error) => {
      console.error(
        "errore nell'eliminazione della spesa:".error.response.data
      );
    },
  });

  const destroyUserExpenses = async (data) => {
    try {
      setReload(false);
      await destroyUserExpensesMuation.mutateAsync(data);
    } catch (error) {
      console.error("errore", error);
    }
  };

  const updateUserExpensesMutation = useMutation(updateExpenses, {
    onSuccess: (data) => {
      setReload(true);
    },
    onError: (error) => {
      console.error("errore nell'update della spesa:".error.response.data);
    },
  });

  const updateUserExpenses = async (data) => {
    try {
      setReload(false);
      await updateUserExpensesMutation.mutateAsync(data);
    } catch (error) {
      console.error("error");
    }
  };

  const storeUserExpensesMutation = useMutation(storeExpenses, {
    onSuccess: (data) => {
      setReload(true);
    },
    onError: (error) => {
      console.error("errore nell'update della spesa:".error.response.data);
    },
  });

  const storeUserExpenses = async (data) => {
    try {
      setReload(false);
      await storeUserExpensesMutation.mutateAsync(data);
    } catch (error) {
      console.error("error");
    }
  };

  const value = {
    accessToken,
    userId,
    userName,
    isLoggedIn,
    expenses,
    searchData,
    monthData,
    isLoading,
    reload,
    success,
    registerUser,
    loginUser,
    logoutUser,
    userExpenses,
    userExpensesSearch,
    userExpensesByMonth,
    destroyUserExpenses,
    updateUserExpenses,
    storeUserExpenses,
    getUserByToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
