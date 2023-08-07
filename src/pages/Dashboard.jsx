import React, { useContext } from "react";
import ExpensesData from "../components/expensesData/ExpensesData";

function Dashboard() {

  return (
    <div className="flex flex-col items-center">
      <ExpensesData />
      {/* <StoreExpenses /> */}
    </div>
  );
}

export default Dashboard;
