import React, { useEffect, useState } from "react";
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import { UilCalendar } from '@iconscout/react-unicons';
import "./DatePicker.css"
import { formatDate, getEndOfWeek, getStartOfWeek } from "../../Functions/Functions";

const DatePicker = ({ onDateRangeChange }) => {
  const [open, setOpen] = useState(false);

  const handleRangeChange = (range) => {
    setDateRange(range);
    onDateRangeChange(range); // Pass data to parent
  };
    
    
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
  

  return (
    <div className="date-range-picker">
        <div>
            <div className="date-inputs">
                <div onClick={()=>setOpen(!open)} className="date-input">
                    <h4>{formatDate(dateRange.startDate)}</h4>
                    <UilCalendar/>
                </div>
                <h3>-</h3>
                <div onClick={()=>setOpen(!open)} className="date-input">
                    <h4>{formatDate(dateRange.endDate)}</h4>
                    <UilCalendar/>
                </div>
            </div>        
            <DateRangePicker 
                open={open}
                onChange={handleRangeChange}
            />
        </div>
    </div>
  );
};

export default DatePicker;
