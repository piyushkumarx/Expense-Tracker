import React, { useContext, useState } from "react";
import "./Delete.css";
import ExpenseTracker from "./Context";

function DeleteModal({ closeDeleteBox }) {
  const { deleteExpense, expenseToDel } = useContext(ExpenseTracker);

  return (
    <div className="delete-overlay">
      <div className="delete-modal-box">
        <h3>Delete Expense?</h3>
        <p className="delete-bio">Are you sure you want to delete?</p>

        <div className="edit-task-buttons">
          <button
            className="delete-button cancel-button"
            onClick={closeDeleteBox}
          >
            Cancel
          </button>
          <button
            onClick={() => deleteExpense(expenseToDel)}
            className="delete-button delete-button-red"
          >
            Delete
          </button>
        </div>  
      </div>
    </div>
  );   
}

export default DeleteModal;
