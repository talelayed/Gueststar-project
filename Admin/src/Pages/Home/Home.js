import React, { useState } from 'react'
import "./Home.css"
import MainDash from '../../Components/MainDash/MainDash'
import RightSide from '../../Components/RightSide/RightSide'
import { getEndOfWeek, getStartOfWeek } from '../../Functions/Functions'

const Home = () => {

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
      const handleDateRangeRightChange = (range) => {
        setDateRange(range);
      };

  return (
    <div className='main'>
      <MainDash onDateRangeRightChange={handleDateRangeRightChange}/>
      <RightSide dateRange={dateRange}/>
    </div>
  )
}

export default Home
