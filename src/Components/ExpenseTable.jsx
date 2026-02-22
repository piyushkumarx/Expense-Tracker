import React, { useContext } from "react";
import "./ExpenseTable.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ExpenseTracker from "./Context";

const ExpenseTable = ({
  TableData,
  btnAmount,
  openEditBox,
  openDeleteBox,
  filterName,
}) => {
  const { searchInput, startDate, endDate } = useContext(ExpenseTracker);

  return (
    <div className="table-card">
      <table className="main-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {TableData.filter((item) => {
            const itemDate = new Date(item.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            itemDate.setHours(0, 0, 0, 0);
            if (start) start.setHours(0, 0, 0, 0);
            if (end) end.setHours(0, 0, 0, 0);

            return (
              item.title.toLowerCase().includes(searchInput.toLowerCase()) &&
              (filterName === "All" || item.cat === filterName) &&
              (!start || itemDate >= start) &&
              (!end || itemDate <= end)
            );
          })
            .sort((a, b) => {
              if (btnAmount === "up") return a.price - b.price;
              if (btnAmount === "down") return b.price - a.price;
              return 0;
            })
            .map((item) => (
              <tr key={item.id}>
                <td data-label="Title" className="title-cell">
                  {item.title}
                </td>

                <td data-label="Category">
                  <span
                    className="cat-badge"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} /> {item.cat}
                  </span>
                </td>

                <td data-label="Date" className="date-cell">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td
                  data-label="Amount"
                  className={btnAmount ? "active-amount-cell" : "amount-cell"}
                >
                  $ {item.price}
                </td>

                <td data-label="Action" className="action-btn">
                  <div className="action-btn-div">
                    <button
                      className="edit-btn"
                      onClick={() => openEditBox(item)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>

                    <button
                      className="trash-btn"
                      onClick={() => openDeleteBox(item)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
