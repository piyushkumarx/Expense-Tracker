import React, { useContext } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faTableCellsLarge,
  faChartPie,
  faMoneyBillWave,
  faGear,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import ExpenseTracker from "./Context";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { activeDashboard, setActiveDashboard, activeReport, setActiveReport } =
    useContext(ExpenseTracker);
  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`sidebar-nav ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-first">
            <FontAwesomeIcon icon={faWallet} className="logo-icon" />
            <span className="logo-name">Expense Tracker</span>
          </div>
          {sidebarOpen && (
            <FontAwesomeIcon
              icon={faXmark}
              style={{ color: "rgb(233, 27, 27)" }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>

        <div className="nav-section">
          <p className="section-label">MAIN</p>

          <div
            className={activeDashboard ? "nav-item active" : "nav-item"}
            onClick={() => {
              setSidebarOpen(false);
              setActiveReport(false);
              setActiveDashboard(true)
            }}
          >
            <FontAwesomeIcon icon={faTableCellsLarge} /> Dashboard
          </div>

          <div className={activeReport ? "nav-item active" : "nav-item"} onClick={() => {setSidebarOpen(false); setActiveDashboard(false);
            setActiveReport(true)
          }}>
            <FontAwesomeIcon icon={faChartPie} />Reports   
          </div> 

          
        </div>
      </div>
    </>
  );
}


