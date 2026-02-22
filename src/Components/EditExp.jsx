import React, { useContext, useState } from "react";
import "./EditExp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import ExpenseTracker from "./Context";
import ExpenseTable from "./ExpenseTable";

export default function EditExp({ closeEditBox }) {
  const { expenseToEdit, setExpenseToEdit, editFunction, categoryMap } =
    useContext(ExpenseTracker);
  const handler = () => {
    if (
      !expenseToEdit.title ||
      !expenseToEdit.date ||
      expenseToEdit.cat === "Select"
    ) {
      return alert("Please fill all the inputs :(");
    } else if (!expenseToEdit || expenseToEdit.price <= 0) {
      return alert("Price cannot be 0 or less than 0:(");
    }
    editFunction(expenseToEdit);
  };

  return (
    <div className="overlay-Edit">
      <div className="card">
        <div className="add-name-icon">
          <div className="cart-icon">
            <FontAwesomeIcon icon={faPen} className="cart" />
            <h2>Edit Expense</h2>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            className="icon-cross"
            onClick={closeEditBox}
          />
        </div>

        <div className="row">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Groceries"
              className="add-exp-input"
              value={expenseToEdit.title}
              onChange={(e) =>
                setExpenseToEdit((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="field">
            <label>Amount ($)</label>
            <input
              type="number"
              placeholder="$ 0.00"
              className="add-exp-input"
              value={expenseToEdit.price}
              onChange={(e) =>
                setExpenseToEdit((prev) => ({
                  ...prev,
                  price: Number(Number(e.target.value).toFixed(2)),
                }))
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Category</label>
            <select
              className="add-exp-select"
              value={expenseToEdit.cat}
              onChange={(e) => {
                const selectedCat = e.target.value;
                const selectedCategory = categoryMap[selectedCat];
                const selectedIcon = categoryMap[selectedCat];
                setExpenseToEdit((prev) => ({
                  ...prev,
                  cat: selectedCat,
                  color: selectedCategory?.color || prev.color,
                  icon: selectedIcon?.icon || prev.icon,
                }));
              }}
            >
              <option>Select</option>
              <option>Food</option>
              <option>Recharge & Bills</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Shopping</option>
              <option>Health</option>
              <option>Other</option>
            </select>
          </div>

          <div className="field">
            <label>Date</label>
            <input
              type="date"
              className="add-exp-input"
              value={expenseToEdit.date}
              onChange={(e) =>
                setExpenseToEdit((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <button className="btn" onClick={handler}>
          Save
        </button>
      </div>
    </div>
  );
}
