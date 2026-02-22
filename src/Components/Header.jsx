import React, { useContext } from "react";
import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import ExpenseTracker from "./Context";

const Header = ({ onAddClick }) => {
  const { setSidebarOpen , activeDashboard } = useContext(ExpenseTracker);

  return (
    <div className="header-container">
      <div className="hamburger-container">
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        <h1 className="page-title">{activeDashboard ? "Dashboard" : "Report"}</h1>
      </div>
      {activeDashboard && <button className="add-expense-btn" onClick={onAddClick}>
        <FontAwesomeIcon icon={faPlus} /> Add Expense
      </button>}
    </div>
  );
};

export default Header;
