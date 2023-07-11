import React from "react";
import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";

function StoreExpenses() {
    const { accessToken, storeUserExpenses } = useAuth();
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

    const data = {
      accessToken,
      title,
      amount,
      date,
      description,
    };

    storeUserExpenses(data);
    titleRef.current.value = ''
    amountRef.current.value = ''
    dateRef.current.value = ''
    descriptionRef.current.value = ''
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" ref={titleRef} required />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          ref={amountRef}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" ref={dateRef} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          ref={descriptionRef}
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default StoreExpenses;
