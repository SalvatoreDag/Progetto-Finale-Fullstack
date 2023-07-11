import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { getExpenses } from "../utilis/api";
import SearchExpenses from "../components/search/SearchExpenses";
import ExpensesData from "../components/expensesData/ExpensesData";
import StoreExpenses from "../components/storeExpenses/StoreExpenses";

function Dashboard() {
  return (
    <div className="flex flex-col items-center">
      <ExpensesData />
      <StoreExpenses />
    </div>
  );
}

export default Dashboard;
