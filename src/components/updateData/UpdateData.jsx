import React, { useRef } from "react";
import { useAuth } from "../../context/AuthContext";

function UpdateData({ oldData }) {
  const { id, currentTitle, currentAmount, currentDate, currentDescription } = oldData;

  const { accessToken, updateUserExpenses } = useAuth();
  const titleRef = useRef("");
  const amountRef = useRef("");
  const dateRef = useRef("");
  const descriptionRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const amount = amountRef.current.value;
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;
    console.log(date);
    console.log(amount);
    console.log(title);
    
    const data = {
      id,
      accessToken,
      title,
      amount,
      date,
      description,
    };

    updateUserExpenses(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          required
          defaultValue={currentTitle}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          ref={amountRef}
          required
          defaultValue={currentAmount}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          ref={dateRef}
          required
          defaultValue={currentDate}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          ref={descriptionRef}
          required
          defaultValue={currentDescription}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateData;
