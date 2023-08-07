import React from "react";
import { useState, useEffect } from "react";
import ExpensesLayout from "../expensesLayout/ExpensesLayout";
import ChartLayout from "../chartLayout/ChartLayout";
import Loading from "../loading/Loading";
import StoreExpenses from "../storeExpenses/StoreExpenses";
import { expensesByMonth } from "../../utilis/api";
import { ClientQuery } from "../../query/ClientQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MonthSelect from "../monthSelect/MonthSelect";

//component that manages expense data
function ExpensesData() {
  const accessToken =
    sessionStorage.getItem("accessToken") || localStorage.getItem("token");
  const { destroyUserExpenses } = ClientQuery();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [searchResults, setSearchResults] = useState([]);

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

  const selectedMonthName = monthNames[selectedMonth];

  const updateSearchResults = (updatedResults) => {
    setSearchResults(updatedResults);
  };

  //call to recover expenses
  const { data, isLoading, isError, error } = useQuery(
    ["expensesByMonth", selectedMonthName],
    () => expensesByMonth({ accessToken, selectedMonthName }),
    {
      onError: (error) => {
        queryClient.setQueryData(["message"], error.response.data.message);
      },
    }
  );

  //change month function 
  const handleMonthChange = (selectedValue) => {
    setSelectedMonth(parseInt(selectedValue, 10));
    setSearchResults([]);
  };

  //search function
  const handleSearch = (searchText) => {
    if (searchText.trim() === "") {
      setSearchResults([]); // If the search field is empty, show all expenses
    } else {
      const results = data.data.expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  //delete expenses function
  const deleteExpenses = (id) => {
    const data = {
      id,
      accessToken,
    };
    destroyUserExpenses(data).then(
      setSearchResults((prevSearchResults) => {
        return prevSearchResults.filter((expense) => expense.id !== id);
      })
    );
  };

  const expensesData =
    data && data.data && data.data.expenses ? data.data.expenses : [];

  return (
    <div className="w-max">
      <MonthSelect
        monthNames={monthNames}
        selectedMonth={selectedMonth}
        handleMonthChange={handleMonthChange}
      />
      {expensesData.length > 0 ? (
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="lg:flex">
            <div className="lg:w-1/3">
              <ExpensesLayout
                expensesData={expensesData}
                searchResults={searchResults}
                onSearch={handleSearch}
                onDelete={deleteExpenses}
                updateSearchResults={updateSearchResults}
              />
            </div>
            <div className="lg:w-2/3">
              <ChartLayout expensesData={expensesData} />
          
              {isOpen ? (
                <StoreExpenses expensesData={expensesData} setIsOpen={setIsOpen} />
              ) : (
                <button
                  className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-indigo-700"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Add new Expense +
                </button>
              )}
            </div>
          </div>
          
          )}
        </div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <h3 className="text-center my-5 lg:text-lg font-semibold underline">
            No expenses found, enter some
          </h3>
          <StoreExpenses />
        </div>
      )}
    </div>
  );
}

export default ExpensesData;
