import React, { useEffect, useState, useMemo } from 'react';
import "./Analytics.css";
import DatePicker from '../../Components/DatePicker/DatePicker.js';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ordersRows, products } from "../../Data/Data.js";
import Chart from "react-apexcharts";
import { UilAward } from '@iconscout/react-unicons';
import { aVérifierSumFunction, créeSumFunction, enCoursSumFunction, filterOrdersByDateRange, formatDate, getEndOfWeek, getStartOfWeek, livréSumFunction, retourSumFunction, setXAxis, sumFunction, ventesSumFunction } from '../../Functions/Functions.js';
import PieChart from '../../Components/Stats/PieChart/PieChart.js';
import Bar from '../../Components/Stats/Bar/Bar.js';
import Line from '../../Components/Stats/Line/Line.js';

const Analytics = () => {
    function createData(nom, Governorate, téléphone, produit, commandeId, date, total, status) {
        return { nom, Governorate, téléphone, produit, commandeId, date, total, status };
    }

    const initialRows = ordersRows.map(elt => 
        createData(
            elt.nom, 
            elt.Governorate, 
            elt.téléphone, 
            elt.produit, 
            elt.commandeId, 
            elt.date, 
            elt.total, 
            elt.status
        )
    );

    const [rows, setRows] = useState(initialRows);

    const now = new Date();
    const startOfWeek = getStartOfWeek(now);
    const endOfWeek = getEndOfWeek(now);

    const [dateRange, setDateRange] = useState({
        startDate: startOfWeek,
        endDate: endOfWeek
    });

    const handleDateRangeChange = (range) => {
        setDateRange(range);
    };

    const filteredOrders = useMemo(() => filterOrdersByDateRange(rows, dateRange.startDate, dateRange.endDate), [rows, dateRange]);

    const updatedProducts = products.map((elt) => {
        const totalSum = filteredOrders.reduce((acc, order) => {
            if (order.produit === elt.nom) {
                return acc + 1;
            }
            return acc;
        }, 0);

        return {
            ...elt,
            total: totalSum
        };
    });

    const orderedProducts = updatedProducts.sort((a, b) => b.total - a.total);

    const [barXaxis, setBarXaxis] = useState([]);

    const [seriesBar, setSeriesBar] = useState([]);

    const calculateGovernoratePercentages = () => {
        const orderCounts = filteredOrders.reduce((acc, order) => {
            const governorate = order.Governorate;
            if (!acc[governorate]) {
                acc[governorate] = 0;
            }
            acc[governorate]++;
            return acc;
        }, {});

        const totalOrders = filteredOrders.length;

        const orderPercentages = Object.keys(orderCounts).map(governorate => {
            return {
                governorate,
                percentage: ((orderCounts[governorate] / totalOrders) * 100).toFixed(2) // rounded to 2 decimal places
            };
        });

        orderPercentages.sort((a, b) => b.percentage - a.percentage);       

        setBarXaxis([...orderPercentages.map(item => item.governorate)]);
        setSeriesBar([...orderPercentages.map(item => parseFloat(item.percentage))]);          
    };        

    useEffect(() => {
        calculateGovernoratePercentages();
    }, [filteredOrders]);

    const [revenuRows, setRevenuRows] = useState(updatedProducts.map(product => ({
        ...product,
        costProd: 0,
        costSponsor: 0,
        costLiv: 6,
        totalRevenu: 0,
      })));

      const handleInputChange = (index, field, value) => {
        const newRows = [...revenuRows];
        newRows[index][field] = value;
        setRevenuRows(newRows);
      };
    
  // Function to calculate total revenue based on filtered orders
  const calculateRevenu = (index) => {
    const product = revenuRows[index];       
    
    // Filter orders that match the current product
    const productOrders = filteredOrders.filter(order => order.produit === product.nom);

    // Sum the quantities of the filtered orders for this product
    const totalPrice = productOrders.reduce((sum, order) => sum + order.total, 0);   
        
    // Calculate total revenue for this product
    const revenue = totalPrice - product.costProd * productOrders.length - product.costLiv* productOrders.length -product.costSponsor;

    // Update the state with the calculated revenue
    const newRows = [...revenuRows];    
    newRows[index].totalRevenu = revenue;
    setRevenuRows(newRows);
  };
        
      const [totalProductsRevenu, setTotalProductsRevenu] = useState(0);      

      useEffect(() => {
        setTotalProductsRevenu(revenuRows.reduce((accumulator, product) => accumulator + product.totalRevenu, 0))
      }, [revenuRows])

      // Pie chart
      const xAxis = setXAxis(dateRange.startDate, dateRange.endDate); 

      useEffect(() => {
        setXAxis(dateRange.startDate, dateRange.endDate)
      }, [dateRange])
      

      const créeSumArray= créeSumFunction(filteredOrders, xAxis);
  
      const livréSumArray = livréSumFunction(filteredOrders, xAxis);
        
      const enCoursSumArray = enCoursSumFunction(filteredOrders, xAxis);
                
      const aVérifierSumArray = aVérifierSumFunction(filteredOrders, xAxis);
  
      const retourSumArray = retourSumFunction(filteredOrders, xAxis);

        // Count Orders
    const countOrders = sumFunction(retourSumArray) + sumFunction(aVérifierSumArray) + sumFunction(enCoursSumArray) + sumFunction(livréSumArray); 

    return (
        <div className='Analytics'>
            <h1>Statistiques</h1>
            <DatePicker onDateRangeChange={handleDateRangeChange} />
            <div className="app">
                <div className="chart-container">
                    <Bar barXaxis={barXaxis} seriesBar={seriesBar}/>
                </div>
            </div>
            <div className='best-governorate'>
                Le meilleur gouvernorat en termes de commandes livrées entre {formatDate(dateRange.startDate)} et {formatDate(dateRange.endDate)} est: <span className='governorate'>{barXaxis[0]}</span><UilAward size="40" color="gold" />
            </div>
            <PieChart 
            series={
                [Math.round((sumFunction(enCoursSumArray)/countOrders) * 100),
                    Math.round((sumFunction(livréSumArray)/countOrders) * 100),
                    Math.round((sumFunction(aVérifierSumArray)/countOrders) * 100),
                    Math.round((sumFunction(retourSumArray)/countOrders) * 100)
                ]}
            />
            <h1>Évolution des commandes journalières</h1>
            <Line xAxis={xAxis} series={créeSumArray}/>
            <h1>Best Seller</h1>
            <h4 className='date'>{formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}</h4>
            <TableContainer
                component={Paper}
                style={{
                    boxShadow: "0px 13px 20px 0px #80808029",
                    overflowY: "auto", // Enable vertical scrolling
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rang</TableCell>
                            <TableCell>Produit</TableCell>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">nom</TableCell>
                            <TableCell align="left">Prix</TableCell>
                            <TableCell align="left">Total Ventes</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {orderedProducts.map((product, index) => (
                            <TableRow
                                key={product.produit}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <div className='rang'>
                                        {index + 1}
                                    </div>
                                </TableCell>
                                <TableCell align="left">
                                    {
                                        index == 0 ? <div className='award-product'>
                                            <div className='award-icon'>
                                              <UilAward size="40" color="gold" />
                                            </div>
                                            <img alt={product.nom} height={100} src={product.img} />
                                        </div> 
                                        : 
                                        <img alt={product.nom} height={100} src={product.img} />
                                    }
                                </TableCell>
                                <TableCell align="left">{product.id}</TableCell>
                                <TableCell align="left">
                                    {product.nom}
                                </TableCell>
                                <TableCell align="left">{product.prix}</TableCell>
                                <TableCell align="left">
                                    <div className='total'>
                                        {product.total} commandes
                                    </div>
                                </TableCell>
                                <TableCell align="left" className="Details">
                                    Details
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h1>Revenu</h1>
            <h4 className='date'>{formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}</h4>
            <div className='revenu'>
            </div>
            <TableContainer
                component={Paper}
                style={{
                    boxShadow: "0px 13px 20px 0px #80808029",
                    overflowY: "auto", // Enable vertical scrolling
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Produit</TableCell>
                            <TableCell align="left">Coût de production par pièce (dt)</TableCell>
                            <TableCell align="left">Coût de sponsoring total (dt)</TableCell>
                            <TableCell align="left">Coût de livraison par pièce (dt)</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">Total Revenu (dt)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                    {revenuRows.map((product, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="left">
                  <img alt={product.nom} height={100} src={product.img} />
                </TableCell>
                <TableCell align='center'>
                  <input
                    type='number'
                    className="cost-input"
                    value={product.costProd}
                    onChange={(e) => handleInputChange(index, 'costProd', parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell align='center'>
                  <input
                    type='number'
                    className="cost-input"
                    value={product.costSponsor}
                    onChange={(e) => handleInputChange(index, 'costSponsor', parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell align='center'>
                  <input
                    type='number'
                    className="cost-input"
                    value={product.costLiv}
                    onChange={(e) => handleInputChange(index, 'costLiv', parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell align="left">
                  <button
                    className='revenu-button'
                    onClick={() => calculateRevenu(index)}
                  >
                    Calculer
                  </button>
                </TableCell>
                <TableCell align='center'>
                  <input
                    value={product.totalRevenu}
                    type='number'
                    className="total-revenu"
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left">
                                </TableCell>
                                <TableCell align='center'>
                                </TableCell>
                                <TableCell align='center'>
                                </TableCell>
                                <TableCell align="left">
                                </TableCell>
                                <TableCell align="left">
                                </TableCell>
                                <TableCell align='center'>
                                    <input value={totalProductsRevenu} type='number' className="total-revenu" />
                                </TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Analytics;
