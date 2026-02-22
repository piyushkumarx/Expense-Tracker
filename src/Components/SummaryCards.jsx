import React from "react";
import "./SummaryCards.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReceipt,
  faCalendarDays,
  faArrowTrendUp,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";





export default function SummaryCards({ total, entries, thisMonth , totalAmount }) {
  

  return (
    <div className="summary-box">
      <div className="summary-card">
        <div className="name-icon">
          <div className="summary-name"> Total Spending</div>
          <FontAwesomeIcon icon={faReceipt} className="icon-summary" />
        </div>
        <div className="amount-text">${total}</div>
      </div>
      <div className="summary-card">
        <div className="name-icon">
          <div className="summary-name"> This Month</div>
          <FontAwesomeIcon icon={faCalendarDays} className="icon-summary" />
        </div>
        <div className="amount-text">${thisMonth()}</div>
      </div>
      <div className="summary-card">
        <div className="name-icon">
          <div className="summary-name"> Total Entries</div>
          <FontAwesomeIcon icon={faArrowTrendUp} className="icon-summary" />
        </div>
        <div className="amount-text">{entries}</div>
      </div>
      <div className="summary-card">
        <div className="name-icon">
          <div className="summary-name">Budget</div>
          <FontAwesomeIcon icon={faPiggyBank} className="icon-summary" />
        </div>

        <div className="budget-card-amt">
          <div className="amount-text">${totalAmount}</div>
          <span className="slash"> &nbsp;/</span>
          <span className="sub-text"> &nbsp;$1500.99</span>
        </div>
      </div>
    </div>
  );
}
