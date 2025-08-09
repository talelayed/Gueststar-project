import React, { useState } from "react";
import "./RightSide.css";
import Donut from "../Stats/Donut/Donut";
import { aVérifierSumFunction, créeSumFunction, enCoursSumFunction, filterOrdersByDateRange, getEndOfWeek, getStartOfWeek, livréSumFunction, retourSumFunction, setXAxis, sumFunction, ventesSumFunction } from "../../Functions/Functions";
import { ordersRows } from "../../Data/Data";
import CustomerReview from "../Stats/CustomerReview/CustomerReview";

const RightSide = () => {

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

        // Get filtered orders
        const filteredOrders = filterOrdersByDateRange(ordersRows, dateRange.startDate, dateRange.endDate);    

        const xAxis = setXAxis(dateRange.startDate, dateRange.endDate); 
                    
        const livréSumArray = livréSumFunction(filteredOrders, xAxis);
          
        const enCoursSumArray = enCoursSumFunction(filteredOrders, xAxis);
                  
        const aVérifierSumArray = aVérifierSumFunction(filteredOrders, xAxis);
    
        const retourSumArray = retourSumFunction(filteredOrders, xAxis);
    
        // Count Orders
        const countOrders = filteredOrders.length; 
        
        

  return (
    <div className="RightSide">
      <div>
        <Donut 
            series={
              [Math.round((sumFunction(enCoursSumArray)/countOrders) * 100),
                  Math.round((sumFunction(livréSumArray)/countOrders) * 100),
                  Math.round((sumFunction(retourSumArray)/countOrders) * 100),
                  Math.round((sumFunction(aVérifierSumArray)/countOrders) * 100),
              ]}
        />
      </div>
      <div>
        <h3>Avis Clients</h3>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;
