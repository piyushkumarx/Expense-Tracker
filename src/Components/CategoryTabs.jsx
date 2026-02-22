import React from "react";
import { useContext } from "react";
import ExpenseTracker from "./Context";
import "./CategoryTabs.css";

const CategoryTabs = () => {
  const { filterName, setFilterName } = useContext(ExpenseTracker);

  const categories = [
    "All",
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Recharge & Bills",
    "Health",
    "Other",
  ];

  return (
    <div className="tabs-container">
      {categories.map((cat, index) => (
        <button
          key={index}
          className={`tab-item ${cat === filterName ? "active-tab" : ""}`}
          onClick={() => setFilterName(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
