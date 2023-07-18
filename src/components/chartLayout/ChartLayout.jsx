import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Aggiungi questa importazione

function ChartLayout({ expensesData }) {
  const expenseTitles = expensesData.expenses
    ? expensesData.expenses.map((expense) => expense.title)
    : [];
  const expenseAmounts = expensesData.expenses
    ? expensesData.expenses.map((expense) => expense.amount)
    : [];
  const expenseDate = expensesData.expenses
    ? expensesData.expenses.map((expense) => expense.date)
    : [];

  const chartData = {
    labels: expenseDate,
    datasets: [
      {
        label: "Amount (€)",
        data: expenseAmounts,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 3,
      },
    ],
  };

  // Definire le opzioni del grafico
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            // Ottieni l'indice del tooltip attuale
            const index = tooltipItems[0]?.dataIndex || 0;

            // Restituisci il titolo della spesa corrispondente all'indice
            return expenseTitles[index] || "";
          },
        },
      },
    },
  };

  return (
    <div className="chart-container bg-indigo-50 p-10 rounded-xl ">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default ChartLayout;
