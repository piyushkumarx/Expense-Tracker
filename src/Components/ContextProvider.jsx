import { useEffect, useState } from "react";
import ExpenseTracker from "./Context";

import {
  faUtensils,
  faCarSide,
  faTv,
  faBagShopping,
  faReceipt,
  faHeartPulse,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

function ContextProvider({ children }) {

  const [table, setTable] = useState(() => {
    const savedData = localStorage.getItem("expenses");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [addExpCard, setAddExpCard] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [btnAmount, setBtnAmount] = useState(false);

  const [deleteBox, setDeleteBox] = useState(false);




  const [filterName, setFilterName] = useState("All");


  const [searchInput, setSearchInput] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [expenseToDel, setExpenseToDel] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const [activeDashboard, setActiveDashboard] = useState(true);
  const [activeReport, setActiveReport] = useState(false);

  const categoryMap = {
    Food: { icon: faUtensils, color: "#f97316" },
    "Recharge & Bills": { icon: faReceipt, color: "#eab308" },
    Transport: { icon: faCarSide, color: "#0ea5e9" },
    Entertainment: { icon: faTv, color: "#a855f7" },
    Shopping: { icon: faBagShopping, color: "#ec4899" },
    Health: { icon: faHeartPulse, color: "#22c55e" },
    Other: { icon: faCreditCard, color: "#64748b" },
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(table));
  }, [table]);

  function editFunction(updatedExpense) {
    setTable((prev) =>
      prev.map((item) =>
        item.id === updatedExpense.id ? { ...item, ...updatedExpense } : item,
      ),
    );

    setEditCard(false);
  }

  function reset() {
    setSearchInput("");
    setStartDate("");
    setEndDate("");
    setBtnAmount(false);
  }

  function deleteExpense(id) {
    setTable((prev) => prev.filter((item) => item.id !== id));
    setExpenseToDel(null);
    setDeleteBox(false);
  }

 

 const filteredData = table.filter(
  (item) => filterName === "All" || item.cat === filterName
);

const total = filteredData.reduce(
  (sum, item) => sum + Number(item.price),
  0
);

const entries = filteredData.length;

const totalAmount = table.reduce(
  (sum, item) => sum + Number(item.price),
  0
);

  const CheckThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = table
      .filter((item) => filterName === "All" || item.cat === filterName)
      .filter((item) => {
        const itemDate = new Date(item.date);

        return (
          itemDate.getMonth() === currentMonth &&
          itemDate.getFullYear() === currentYear
        );
      });

    const totalThisMonth = monthlyExpenses.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    return totalThisMonth.toFixed(2);
  };

  const CheckData = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = table
      .filter((item) => filterName === "All" || item.cat === filterName)
      .filter((item) => {
        const itemDate = new Date(item.date);

        return (
          itemDate.getMonth() === currentMonth &&
          itemDate.getFullYear() === currentYear
        );
      });

    return monthlyExpenses;
  };

  function toggleDeleteBox(item) {
    setExpenseToDel(item.id);
    setDeleteBox(!deleteBox);
  }

  function toggleAddExp() {
    setAddExpCard(!addExpCard);
  }

  function toggleEditExp(item) {
    setExpenseToEdit(item);
    setEditCard(!editCard);
  }

  function handleAmountBtn() {
    if (btnAmount === true) {
      setBtnAmount("up");
    } else if (btnAmount === "up") {
      setBtnAmount("down");
    } else if (btnAmount === "down") {
      setBtnAmount(false);
    } else {
      setBtnAmount(true);
    }
  }

  return (
    <ExpenseTracker.Provider
      value={{
        table,
        setTable,
        addExpCard,
        toggleAddExp,
        btnAmount,
        handleAmountBtn,
        editCard,
        toggleEditExp,
        toggleDeleteBox,
        deleteBox,
        total,
        entries,
        CheckThisMonth,
        filterName,
        setFilterName,
        totalAmount,
        searchInput,
        setSearchInput,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        reset,
        expenseToDel,
        setExpenseToDel,
        deleteExpense,
        expenseToEdit,
        setExpenseToEdit,
        editFunction,
        categoryMap,
        sidebarOpen,
        setSidebarOpen,
        activeDashboard,
        setActiveDashboard,
        activeReport,
        setActiveReport,
        CheckData,
      }}
    >
      {children}
    </ExpenseTracker.Provider>
  );
}

export default ContextProvider;
