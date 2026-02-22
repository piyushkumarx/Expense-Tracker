import React, { useState } from "react";
import "./AddExp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCartShopping,
  faPlus,
  faTv,
  faUtensils,
  faCarSide,
  faBagShopping,
  faReceipt,
  faHeartPulse,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

export default function AddExp({ onAddClick, setTable, categoryMap }) {
  const [title, setTitle] = useState("");
  const [amt, setAmt] = useState();
  const [date, setDate] = useState();
  const [cat, setCat] = useState();

  const [err, setErr] = useState(false);

  const formattedAmount = Number(amt).toFixed(2);

  const look = categoryMap[cat];

  const FunctionTable = () => {
    if (!title || !amt || !date || !cat) {
      setErr(true);
      return;
    } else {
      const newOne = {
        id: Math.floor(Math.random() * 999999),
        title: title,
        cat: cat,
        icon: look.icon,
        color: look.color,
        date: date,
        price: Number(formattedAmount),
      };

      setTable((old) => [...old, newOne]);
      onAddClick();
    }
  };
  const handler = () => {
    if (Number(amt) <= 0) {
      return alert("Price cannot be 0 or less than 0:(");
    }
    FunctionTable();
  };

  return (
    <div className="overlay">
      <div className={err ? "err" : "card"}>
        <div className="add-name-icon">
          <div className="cart-icon">
            <FontAwesomeIcon icon={faCartShopping} className="cart" />
            <h2>Add Expense</h2>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            className="icon-cross"
            onClick={onAddClick}
          />
        </div>

        <div className="row">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Groceries"
              className="add-exp-input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label>Amount ($)</label>
            <input
              type="number"
              placeholder="$ 0.00"
              className="add-exp-input"
              value={amt}
              onChange={(e) => {
                setAmt(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Category</label>
            <select
              className="add-exp-select"
              value={cat}
              onChange={(e) => {
                setCat(e.target.value);
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
              value={date}
              onChange={(e) => {
                setDate(e.target.value.trim());
              }}
            />
          </div>
        </div>

        <div className="last-row">
          {err && (
            <p className="err-p">
              <i>Something is missing</i>
            </p>
          )}
          <button className="btn" onClick={handler}>
            <FontAwesomeIcon icon={faPlus} size="xs" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
