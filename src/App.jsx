import { useContext } from "react";
import ExpenseTracker from "./Components/Context";

import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import SummaryCards from "./Components/SummaryCards";
import CategoryTabs from "./Components/CategoryTabs";
import SearchBar from "./Components/SearchBar";
import ExpenseTable from "./Components/ExpenseTable";
import AddExp from "./Components/AddExp";
import "./App.css";
import EditExp from "./Components/EditExp";
import DeleteModal from "./Components/Delete";
import { Doughnut , Bar } from 'react-chartjs-2';
// import chart from "./Components/Chart.jsx"import { Doughnut } from "react-chartjs-2";


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);



function App() {
  const {
    table,
    setTable,
    addExpCard,
    toggleAddExp,
    toggleEditExp,
    btnAmount,
    handleAmountBtn,
    editCard,
    toggleDeleteBox,
    total,
    entries,
    CheckThisMonth,
   totalAmount,
    filterName,
    deleteBox,
    searchInput,
    setSearchInput,
    categoryMap,
    sidebarOpen,
setSidebarOpen,
activeDashboard,
activeReport,
CheckData,
  } = useContext(ExpenseTracker);





ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;

const datax = CheckData();


let arrNew = [];

datax.map((item)=>{
  const exist = arrNew.find((item2)=>item2.cat == item.cat)
  if(exist){
    exist.price+=item.price
  }else{
    arrNew.push({...item})
  }
})


const labelss = arrNew.map(item => item.cat);
const pricelist = arrNew.map(item => item.price);

  const dataX = {
labels: labelss,  
datasets: [
{
label: "Spend on this Month",
data: pricelist,
backgroundColor: [
"#1E3A8A",
"#38BDF8",
"#2563EB",
"#F59E0B",
"#EF4444",
"#A855F7",
"#FB7185",
],
borderWidth: 6,
},
],
};

const options = {
responsive: true,
};






  return (
    <>
      {addExpCard && <AddExp onAddClick={toggleAddExp} setTable={setTable} categoryMap={categoryMap} />}

      <div className="layout-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="main-content">
          <Header onAddClick={toggleAddExp} />

          <SummaryCards total={total} entries={entries} table={table} thisMonth={CheckThisMonth} totalAmount={totalAmount}/>

          {activeDashboard && <CategoryTabs  />}

          {activeDashboard && <SearchBar handleAmountBtn={handleAmountBtn} btnAmount={btnAmount}  searchInput={searchInput} setSearchInput ={setSearchInput}/>}

          {activeDashboard &&<ExpenseTable TableData={table} btnAmount={btnAmount} openEditBox=  {toggleEditExp} openDeleteBox={toggleDeleteBox}  filterName={filterName}/>  }

       {activeReport && <div className="charts"><div className="chart"> <Doughnut className="Doughnut" data={dataX} options={options} /></div>
        <div className="chart2"> <Bar className="Bar"  data={dataX} options={options}  /></div></div>}

          {editCard && <EditExp closeEditBox={toggleEditExp} />}

          {deleteBox && <DeleteModal closeDeleteBox={toggleDeleteBox}/>}
        </div>
      </div>    
    </>
  );
  

}

export default App;
