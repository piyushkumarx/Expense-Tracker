import React, { useContext, useState } from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowsRotate,
  faUpLong,
  faDownLong,
} from "@fortawesome/free-solid-svg-icons";
import ExpenseTracker from "./Context";

const SearchBar = ({
  handleAmountBtn,
  btnAmount,
  searchInput,
  setSearchInput,
}) => {
  const { startDate, endDate, setStartDate, setEndDate , reset} =
    useContext(ExpenseTracker);
  return (
    <div className="search-container">
      
      <div className="input-group">
        <label htmlFor="search-exp">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </label>
        <input
          type="text"
          placeholder="Search expenses..."
          className="search-exp"
          id="search-exp"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>

      <div className="date-group">
        <input
          type="date"
          placeholder="dd-mm-yyyy"
          className="date-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="dd-mm-yyyy"
          className="date-input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="sort-group">
        <button
          className={`${btnAmount === false ? "btn-up-down" : "active-btn-up-down"}`}
          onClick={() => {
            handleAmountBtn();
          }}
        >
          <span className="up-down ">
            Amount{" "}
            <FontAwesomeIcon
              icon={
                btnAmount === "up"
                  ? faUpLong
                  : btnAmount === "down"
                    ? faDownLong
                    : null
              }
            />
          </span>
        </button> 
        <button className="btn-reset" onClick={reset}>
          <FontAwesomeIcon icon={faArrowsRotate} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
