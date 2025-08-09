import React from "react";
import "./Cards.css";
import Card from "../Card/Card";
// Sidebar imports
import {
  UilClipboardAlt,
  UilCar,
  UilArchive,
  UilPhoneAlt,
  UilDollarAlt,
  UilCheck
} from "@iconscout/react-unicons";
import { ordersRows } from "../../Data/Data";
import { aVérifierSumFunction, créeSumFunction, enCoursSumFunction, filterOrdersByDateRange, formatDate, livréSumFunction, retourSumFunction, setXAxis, sumFunction, ventesSumFunction } from "../../Functions/Functions";

const Cards = ({startDate, endDate}) => { 
  
        // Get filtered orders
    const filteredOrders = filterOrdersByDateRange(ordersRows, startDate, endDate);    

    const xAxis = setXAxis(startDate, endDate); 

    const créeSumArray = créeSumFunction(filteredOrders, xAxis);
        
    const ventesSumArray = ventesSumFunction(filteredOrders, xAxis);

    const livréSumArray = livréSumFunction(filteredOrders, xAxis);
      
    const enCoursSumArray = enCoursSumFunction(filteredOrders, xAxis);
              
    const aVérifierSumArray = aVérifierSumFunction(filteredOrders, xAxis);

    const retourSumArray = retourSumFunction(filteredOrders, xAxis);

    // Count Orders
    const countOrders = filteredOrders.length;    

    // Analytics Cards Data
const cardsData = [
  {
    title: "Ventes",
    color: {
      backGround: "linear-gradient(180deg, #FFD700 0%, #FFC300 100%)",
      boxShadow: "0px 8px 12px 0px #FFD700",
    },
    barValue: Math.round((sumFunction(livréSumArray)/countOrders) * 100),
    value: sumFunction(ventesSumArray),
    png: UilDollarAlt,
    series: [
      {
        name: "Ventes",
        data: ventesSumArray,
      },
    ],
  },
  {
    title: "Nv commandes",
    color: {
      backGround: "linear-gradient(180deg, #66ff66 0%, #33cc33 100%)",
      boxShadow: "0px 8px 12px 0px #66ff66",
    },
    barValue: Math.round((sumFunction(livréSumArray)/countOrders) * 100),
    value: sumFunction(livréSumArray),
    png: UilCheck,
    series: [
      {
        name: "livré",
        data: livréSumArray,
      },
    ],
  },
  {
    title: "En cours",
    color: {
      backGround: "linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)",
      boxShadow: "0px 8px 12px 0px #4facfe",
    },
    barValue: Math.round((sumFunction(enCoursSumArray)/countOrders) * 100),
    value: sumFunction(enCoursSumArray),
    png: UilCar,
    series: [
      {
        name: "En cours",
        data: enCoursSumArray,
      },
    ],
  },
];
    

  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
              startDate={startDate} 
              endDate={endDate}
              xAxis={xAxis}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
