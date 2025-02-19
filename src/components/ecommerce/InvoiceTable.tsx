"use client";


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, TablePagination, TextField, Button
} from "@mui/material";

interface InvoiceData {
  customer_name: string;
  invoice_number: string;
  supplier_name: string;
  clearance_status: string;
  issue_date: string;
}

export default function InvoiceTable() {
  const [data, setData] = useState<InvoiceData[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof InvoiceData>("invoice_number");
  const [filters, setFilters] = useState({ customer_name: "", invoice_number: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const API_URL = `http://130.61.209.11:8080/ords/zatca/zatca_prod/InvoiceInformation?CUSTOMERNAME=${filters.customer_name || 'undefined'}&INVOICENO=${filters.invoice_number || 'undefined'}&STATUS=ALL&SUPPLIERNAME=undefined&page=${page + 1}&size=${rowsPerPage}`;

    // const API_URL = `http://130.61.209.11:8080/ords/zatca/zatca_prod/InvoiceInformation?CUSTOMERNAME=${filters.customer_name || 'undefined'}&ENDDATE=${isToDate || 'undefined'}&INVOICENO=${filters.invoice_number || 'undefined'}&STARTDATE=${isFromDate || 'undefined'}&STATUS=${filters.clearance_status || 'ALL'}&SUPPLIERNAME=${filters.supplier_name || 'undefined'}&page=${page + 1}&size=${rowsPerPage}`;
    
    try {
      const response = await axios.get(API_URL);
      setData(response.data.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSort = (property: keyof InvoiceData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setData([...data].sort((a, b) => (isAsc ? (a[property] > b[property] ? 1 : -1) : a[property] < b[property] ? 1 : -1)));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      {/* Filters */}
      <div className="mb-4 flex space-x-4">
        <TextField
          label="Customer Name"
          variant="outlined"
          value={filters.customer_name}
          onChange={(e) => setFilters({ ...filters, customer_name: e.target.value })}
        />
        <TextField
          label="Invoice Number"
          variant="outlined"
          value={filters.invoice_number}
          onChange={(e) => setFilters({ ...filters, invoice_number: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={fetchData}>
          Search
        </Button>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="rounded-lg shadow-md">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              {Object.keys(data[0] || {}).map((key) => (
                <TableCell key={key} className="font-bold uppercase">
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : "asc"}
                    onClick={() => handleSort(key as keyof InvoiceData)}
                  >
                    {key.replace(/_/g, " ")}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-200 transition">
                {Object.values(row).map((value, idx) => (
                  <TableCell key={idx} className="py-2 px-4">{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />
    </div>
  );
}
