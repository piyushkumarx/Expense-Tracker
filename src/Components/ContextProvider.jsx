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
  const tableData = [
    {
      id: 839196,
      title: "Grocery Shopping",
      cat: "Food",
      date: "2026-02-13",
      price: 85.5,
      icon: faUtensils,
      color: "#f97316",
    },
    {
      id: 746443,
      title: "Uber Ride",
      cat: "Transport",
      date: "2026-02-12",
      price: 24.0,
      icon: faCarSide,
      color: "#0ea5e9",
    },
    {
      id: 831123,
      title: "Coffee & Snacks",
      cat: "Other",
      date: "2026-02-11",
      price: 98.5,
      icon: faCreditCard,
      color: "#64748b",
    },
    {
      id: 181527,
      title: "Netflix Subscription",
      cat: "Entertainment",
      date: "2026-02-10",
      price: 15.99,
      icon: faTv,
      color: "#a855f7",
    },
    {
      id: 182827,
      title: "New Headphones",
      cat: "Shopping",
      date: "2026-02-09",
      price: 149.99,
      icon: faBagShopping,
      color: "#ec4899",
    },
    {
      id: 40829,
      title: "Electricity Bill",
      cat: "Recharge & Bills",
      date: "2026-02-08",
      price: 120.0,
      icon: faReceipt,
      color: "#eab308",
    },
    {
      id: 730661,
      title: "Doctor Visit",
      cat: "Health",
      date: "2026-02-07",
      price: 60.0,
      icon: faHeartPulse,
      color: "#22c55e",
    },
  ];

  const [table, setTable] = useState(() => {
    const savedData = localStorage.getItem("expenses");
    return savedData ? JSON.parse(savedData) : tableData;
  });

  const [addExpCard, setAddExpCard] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [btnAmount, setBtnAmount] = useState(false);

  const [deleteBox, setDeleteBox] = useState(false);

  const [total, setTotal] = useState(0);

  const [entries, setEntries] = useState(0);

  const [filterName, setFilterName] = useState("All");

  const [totalAmount, setTotalAmount] = useState(0);

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

  useEffect(() => {
    const totalAmount = table.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    setTotalAmount(totalAmount.toFixed(2));
  }, [table]);

  useEffect(() => {
    const TotalAmt = table
      .filter((item) => filterName === "All" || item.cat === filterName)
      .reduce((sum, item) => {
        return sum + Number(item.price);
      }, 0);

    setTotal(TotalAmt.toFixed(2));
    setEntries(
      table.filter((item) => filterName === "All" || item.cat === filterName)
        .length,
    );
  }, [table, filterName]);

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
