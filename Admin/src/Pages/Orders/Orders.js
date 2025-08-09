import React, { useEffect, useState } from "react";
import "./Orders.css";
import {UilSearch} from "@iconscout/react-unicons"
import { filterCardsData } from "../../Data/Data";
import FilterCard from "../../Components/FilterCard/FilterCard";
import DatePicker from "../../Components/DatePicker/DatePicker";
import OrdersTable from "../../Components/OrdersTable/OrdersTable";
import { getEndOfWeek, getStartOfWeek } from "../../Functions/Functions";

const Orders = () => { 

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

  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("Tous");     

  return (
    <div className="Orders">
      <h1>Commandes</h1>
      <DatePicker onDateRangeChange={handleDateRangeChange}/>
      <div className="cards-flex">
      {
        filterCardsData.map((card) => (
            <FilterCard
            title={card.title}
            color={card.color}
            onClick={()=>setFilterGroup(card.title)}
            />
        ))
      }
      </div>
      <div className="filter-title">
        <h2>{filterGroup}</h2>
      </div>
      <div className="search-parent">
            <div className="search">
              <input className="search-text" placeholder="Search" onChange={(e) => { setSearch(e.target.value); }} />
              <UilSearch/>
            </div>
      </div>
      <OrdersTable startDate={dateRange.startDate} endDate={dateRange.endDate} filterGroup={filterGroup} search={search}/>
    </div>
  );
};

export default Orders;
