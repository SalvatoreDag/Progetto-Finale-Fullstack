import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import ExpensesDataLayout from "../expensesDataLayout/ExpensesDataLayout";
import ChartLayout from "../chartLayout/ChartLayout";
import Loading from "../loading/Loading";
import axios from "axios";


function ExpensesData() {
  const { accessToken, userExpensesByMonth, monthData, isLoading, destroyUserExpenses, reload } = useAuth();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [searchResults, setSearchResults] = useState([]);
  // const [deletedExpenseId, setDeletedExpenseId] = useState(null);
  // const [isDeleted, setIsDeleted] = useState(false);
  // const [expenses, setExpenses] = useState([]);


  


  // Array con i nomi dei mesi (in base all'indice del mese)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
    setSearchResults([]);
  };

  const handleSearch = (searchText) => {
    if (searchText.trim() === "") {
      setSearchResults([]); // Se il campo di ricerca è vuoto, mostra tutte le spese
    } else {
      const results = monthData.data.expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const deleteExpenses = (event, id) => {

    const data = {
      id,
      accessToken,
    };
    console.log(data);
    destroyUserExpenses(data);
    //  setDeletedExpenseId(id);>
    //  setIsDeleted(true);
  };

  useEffect(() => {
    const data = {
      accessToken,
      selectedMonthName: monthNames[selectedMonth],
    };
    userExpensesByMonth(data);
    handleSearch("");
    //  setIsDeleted(false);
  }, [selectedMonth, reload]);

  const expensesData = monthData && monthData.data ? monthData.data : [];


  return (
    <div className="lg:w-2/5">
      <div className="p-4 text-center">
        <select
          className="bg-white p-2  rounded-3xl"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {monthNames.map((monthName, index) => (
            <option className="uppercase" key={index} value={index}>
              {monthName}
            </option>
          ))}
        </select>
      </div>
      <div>
        {isLoading ? ( // Mostra l'indicatore di caricamento se loading è true
          <Loading />
        ) : (
          <div>
            <ExpensesDataLayout
              expensesData={expensesData}
              selectedMonth={monthNames[selectedMonth]}
              searchResults={searchResults}
              onSearch={handleSearch}
              onDelete={deleteExpenses}
            />
            <ChartLayout expensesData={expensesData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpensesData;
