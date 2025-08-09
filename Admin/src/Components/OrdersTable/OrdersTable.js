import React, { useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./OrdersTable.css"
import {ordersRows} from "../../Data/Data.js"
import { filterOrdersByDateRange, formatDate, makeStyle } from '../../Functions/Functions.js';

const OrdersTable = ({startDate, endDate, filterGroup, search}) => {

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
      const [prevSearch, setPrevSearch] = useState('');

      // Get filtered orders
  const filteredOrders = filterOrdersByDateRange(rows, startDate, endDate);

    useEffect(() => {
        if(search==="" || search.length < prevSearch.length)
        filter(filterGroup);
        else        
        {  const filteredProducts = rows.filter((order) => {
            const searchLower = search.toLowerCase();
            return (
              order.nom?.toLowerCase().includes(searchLower) ||
              order.Governorate.toLowerCase().includes(searchLower) ||
              order.téléphone.toLowerCase().includes(searchLower) ||
              order.produit.toLowerCase().includes(searchLower)||
              order.commandeId.toString().toLowerCase().includes(searchLower) ||
              // order.date.toLowerCase().includes(searchLower) ||
              order.total.toString().toLowerCase().includes(searchLower) ||
              order.status.toLowerCase().includes(searchLower)
            );
          });
          setRows(filteredProducts);
        }
        setPrevSearch(search);
      }, [search]);

      const filter = (filterGroup) => {
        if (filterGroup === "Tous"){
          setRows(initialRows);
        }else{
          const filteredData = initialRows.filter((order)=>(
            order.status === filterGroup            
          ))
          setRows(filteredData);
        }
      }

      useEffect(() => {
        filter(filterGroup)
      }, [filterGroup])      

      const updateRowStatus = (id, newStatus) => {
        setRows(prevRows =>
          prevRows.map(row => (row.commandeId === id ? { ...row, status: newStatus } : row))
        );
      };

  return (
    <div className="Table">
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
            <TableCell align="left">Commande ID</TableCell>
            <TableCell align="left">Nom</TableCell>
            <TableCell align="left">Governorate</TableCell>
            <TableCell align="left">téléphone</TableCell>
            <TableCell>Produit</TableCell>
            <TableCell align="left">Date Livré</TableCell>
            <TableCell align="left">total</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ color: "white" }}>
          {
          filteredOrders.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.commandeId}</TableCell>
              <TableCell align="left">{row.nom}</TableCell>
              <TableCell align="left">{row.Governorate}</TableCell>
              <TableCell align="left">{row.téléphone}</TableCell>
              <TableCell component="th" scope="row">
                {row.produit}
              </TableCell>
              <TableCell align="left">{formatDate(row.date)}</TableCell>
              <TableCell align="left">{row.total}</TableCell>
              <TableCell align="left">
                <select className="status" style={makeStyle(row.status)} value={row.status} onChange={(e)=>updateRowStatus(row.commandeId, e.target.value)}>
                  <option value="Livré">Livré</option>
                  <option value="En cours">En cours</option>
                  <option value="Retour">Retour</option>
                  <option value="Reçu">Reçu</option>
                  <option value="A vérifier">A vérifier</option>
                  <option value="Confirmé">Confirmé</option>
                </select>
              </TableCell>
              <TableCell align="left" className="Details">
                Details
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}

export default OrdersTable
