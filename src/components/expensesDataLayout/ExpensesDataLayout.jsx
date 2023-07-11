import React from "react";
import { useState, useEffect } from "react";
import DestroyData from "../destroyData/DestroyData";
import { useAuth } from "../../context/AuthContext";
import UpdateData from "../updateData/UpdateData";

function ExpensesDataLayout({
  expensesData,
  selectedMonth,
  onSearch,
  searchResults,
  onDelete,
}) {
  const [searchText, setSearchText] = useState("");
  const { destroyUserExpenses, accessToken, reload } = useAuth();
  // const [deletedExpenseId, setDeletedExpenseId] = useState(null);
  const [showUpdateData, setShowUpdateData] = useState(false);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchText);

    setSearchText("");
  };
  const handleReset = () => {
    setSearchText("");
    onSearch(""); // Chiama la funzione di ricerca con il campo vuoto per reimpostare i risultati
  };

  // const handleDelete = (event, id) => {
  //   const data = {
  //     id,
  //     accessToken,
  //   };
  //   console.log(data);
  //   destroyUserExpenses(data);
  //   setDeletedExpenseId(id);
  // };

  const handleUpdateForm = () => {
    setShowUpdateData(true);
  };

  const expensesList =
    expensesData && expensesData.expenses ? expensesData.expenses : [];

  const filteredExpenses =
    searchText.length > 0
      ? expensesList.filter((expense) =>
          expense.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : expensesList;

  //  const updatedExpenses = filteredExpenses.filter(
  //    (expense) => expense.id !== deletedExpenseId
  //  );
  return (
    <div className="">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 pl-10 text-sm bg-gray-200 text-gray-900 border rounded-3xl "
            placeholder="Search Expenses..."
            required
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </form>

      <div className="lg:shadow-2xl w-max lg:p-10 lg:rounded-3xl">
        {/* Visualizza i risultati della ricerca */}
        {searchResults.length > 0
          ? searchResults.map((expense) => (
              <div
                className="flex justify-between items-center my-4"
                key={expense.id}
              >
                <div assName="flex flex-col gap-6">
                  <p className="font-bold">{expense.title}</p>
                  <p className=" text-xs">{expense.description}</p>
                </div>
                <div className="ml-4">
                  <p className="font-bold">{expense.amount} €</p>
                  <p>{expense.date}</p>
                </div>
              </div>
            ))
          : // Se non ci sono risultati di ricerca, mostra tutte le spese del mese selezionato
            filteredExpenses.map((expense) => (
              <div className="flex  items-center my-4 " key={expense.id}>
                <div className="flex flex-col w-52">
                  <p className="font-bold">{expense.title}</p>
                  <p className=" text-xs">{expense.description}</p>
                </div>
                <div className="flex gap-5">
                  <div>
                    <p className="font-bold text-right">{expense.amount} €</p>
                    <p>{expense.date}</p>
                  </div>
                  <div className="flex flex-col-reverse">
                    <button
                      className="font-bold"
                      onClick={(event) => onDelete(event, expense.id)}
                    >
                      cestino
                    </button>
                    {/* <button
                      className="font-bold"
                      // onClick={(event) => onDelete(event, expense.id)}
                    >
                      matita
                    </button> */}
                    <button onClick={handleUpdateForm}>
                      matita
                    </button>

                    {showUpdateData &&  (
                      <div className="fixed inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 fixed inset-0"></div> 
                      <div className="bg-white p-8 rounded-md shadow-md relative">
                        <UpdateData
                          oldData={{
                            id: expense.id,
                            currentTitle: expense.title,
                            currentAmount: expense.amount,
                            currentDate: expense.date,
                            currentDescription: expense.description,
                          }}
                        />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>

      {searchResults.length > 0 && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}

export default ExpensesDataLayout;
