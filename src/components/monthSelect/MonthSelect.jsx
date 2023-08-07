import React from 'react'
import { useState } from 'react';

//component that manages the month selection
export default function MonthSelect({ monthNames, selectedMonth, handleMonthChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full">
    <button
      type="button"
      className="bg-white p-2 rounded-lg w-full md:w-auto flex items-center justify-between"
      onClick={toggleDropdown}
    >
      <span className="text-xl">{monthNames[selectedMonth]}</span>
      <svg
        className={`ml-2 w-4 h-4 transform transition-transform ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    {isOpen && (
      <div className="absolute z-10 mt-2 w-full md:w-auto bg-white rounded-lg shadow-lg">
        {monthNames.map((monthName, index) => (
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-indigo-100 ${
              index === selectedMonth ? 'bg-indigo-500 text-white' : 'text-gray-900'
            }`}
            key={index}
            value={index}
            onClick={() => {
              handleMonthChange(index);
              setIsOpen(false);
            }}
          >
            {monthName}
          </button>
        ))}
      </div>
    )}
  </div>
);
}

