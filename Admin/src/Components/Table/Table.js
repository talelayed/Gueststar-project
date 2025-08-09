import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { filterOrdersByDateRange, formatDate, makeStyle } from "../../Functions/Functions";
import { ordersRows } from "../../Data/Data";

export default function BasicTable({startDate, endDate}) {  

        // Get filtered orders
        const filteredOrders = filterOrdersByDateRange(ordersRows, startDate, endDate);  

  return (
    <div className="Table">
      <h3>Commandes Récentes</h3>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          maxHeight: "400px", // Set a fixed height for scrollability
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Commande ID</TableCell>
              <TableCell>Produit</TableCell>
              <TableCell align="left">Date Livré</TableCell>
              <TableCell align="left">Prix</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {filteredOrders.map((row) => (
              <TableRow
                key={row.produit}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.commandeId}</TableCell>
                <TableCell component="th" scope="row">
                  {row.produit}
                </TableCell>
                <TableCell align="left">{formatDate(row.date)}</TableCell>
                <TableCell align="left">{row.prix}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
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
  );
}
