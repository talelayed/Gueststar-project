import React, { useState } from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import DatePicker from "../DatePicker/DatePicker";
import { getEndOfWeek, getStartOfWeek } from "../../Functions/Functions";

const MainDash = () => {
      
        // Get current date
        const now = new Date();
        // Get start and end of current week
        const startOfWeek = getStartOfWeek(now);
        const endOfWeek = getEndOfWeek(now);
      
        // Initialize date range with the current week
        const [dateRange, setDateRange] = useState({
          startDate: startOfWeek,
          endDate: endOfWeek
        });
  
    // Function to handle data from child
    const handleDateRangeChange = (range) => {
      setDateRange(range);
    };
    

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <DatePicker onDateRangeChange={handleDateRangeChange}/>
      <Cards startDate={dateRange.startDate} endDate={dateRange.endDate}/>
      <Table startDate={dateRange.startDate} endDate={dateRange.endDate}/>
    </div>
  );
};

export default MainDash;
