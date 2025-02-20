"use client"

import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
    TableRow, TableSortLabel,
    TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import 'jspdf-autotable';
import * as React from 'react';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DetailTable from './DetailTable';

import { Modal } from "@/components/ui/modal";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import jsPDF from 'jspdf';
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import Alert from '@mui/material/Alert';


interface FilterState {
    customer_name: string;
    invoice_number: string;
    supplier_name: string;
    fromDate: Date | null;
    toDate: Date | null;
    clearance_status: string;
}

interface TableDataItem {
    customer_trx_id: string;
    customer_name?: string;
    invoice_number?: string;
    supplier_name?: string;
    [key: string]: any;
}

interface DataRow {
    process_date: string;
    error_type: string;
    error_code: string;
    error_category: string;
    error_message: string;
    error_status: string;
}

interface TableDataItem {
    process_date: string;
    error_type: string;
    error_code: string;
    error_category: string;
    error_message: string;
    error_status: string;
}

interface ApiResponse {
    items: TableDataItem[];
}

export default function MainTable(): React.JSX.Element {
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
    const [tableData, setTableData] = React.useState<TableDataItem[]>([]);
    const [tableDataSingle, setTableDataSingle] = React.useState<TableDataItem[]>([]);
    const [isRowId, setRowId] = React.useState<string>('');
    const [isFromDate, setFromDate] = React.useState<string>('');
    const [isToDate, setToDate] = React.useState<string>('');
    const [isInvoiceId, setInvoiceId] = React.useState<string>('');
    const [filters, setFilters] = React.useState<FilterState>({
        customer_name: '',
        invoice_number: '',
        supplier_name: '',
        fromDate: null,
        toDate: null,
        clearance_status: ''
    });

    const [modalOpen, setModalOpen] = React.useState(false);


    React.useEffect(() => {
        const fromDate1: string = filters.fromDate
            ? new Date(filters.fromDate).toLocaleDateString("en-CA")
            : '';

        const toDate1: string = filters.toDate
            ? new Date(filters.toDate).toLocaleDateString("en-CA")
            : '';

        setFromDate(fromDate1);
        setToDate(toDate1);
    }, [filters.fromDate, filters.toDate]);



    const API_URL2 = `http://130.61.209.11:8080/ords/zatca/zatca_prod/InvoiceInformation?CUSTOMERNAME=${filters.customer_name || 'undefined'}&ENDDATE=${isToDate || 'undefined'}&INVOICENO=${filters.invoice_number || 'undefined'}&STARTDATE=${isFromDate || 'undefined'}&STATUS=${filters.clearance_status || 'ALL'}&SUPPLIERNAME=${filters.supplier_name || 'undefined'}&page=${page + 1}&size=${rowsPerPage}`;

    const getSingleRow = `http://130.61.209.11:8080/ords/zatca/zatca_prod/InvoiceClearanceErrors?customer_trx_id=${isRowId ? isRowId : 'undefined'}`

    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingDT, setLoadingDT] = React.useState<boolean>(false);
    const [isPending, startTransition] = React.useTransition();
    const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetchData();
    }, []);
    React.useEffect(() => {
        fetchSingleRowData();
    }, [isRowId]);

    const handleRowClick = (rowId: string): void => {
        setRowId(rowId);
        setSelectedRow(rowId);
        setLoadingDT(true);
    };


    const fetchData = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse>(API_URL2);
            startTransition(() => {
                setTableData(response.data.items || []);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };


    const fetchSingleRowData = async (): Promise<void> => {
        setLoadingDT(true);
        try {
            const response = await axios.get<ApiResponse>(getSingleRow);
            startTransition(() => {
                setTableDataSingle(response.data.items || []);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingDT(false);
        }
    };

    const handleChangePage = (event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (name: keyof FilterState, value: string | Date | null): void => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (): void => {
        console.log('Search filters:', filters);
        fetchData();
    };

    const handleReset = (): void => {
        setFilters({
            customer_name: '',
            invoice_number: '',
            supplier_name: '',
            fromDate: null,
            toDate: null,
            clearance_status: ''
        });
    };

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string): void => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        const sortedData = [...tableData].sort((a, b) => {
            return (isAsc ? a[property] > b[property] : a[property] < b[property]) ? 1 : -1;
        });
        setTableData(sortedData);
    };


    // Export Data 
    // ===================================

    // Export PDF 
    const handleDownload = async (invoiceNo: string) => {
        console.log("invoiceNo", invoiceNo)
        if (invoiceNo === "") {
            setOpenAlert(true); 
            setAlertMsg("Please select one of the invoice lines from the table.")
            return;
        } else {

            const pdfUrl = `http://130.61.209.11:8080/ords/zatca/zatca_prod/DownloadInvoice?p_invoiceno=${invoiceNo}`;

            try {
                const response = await fetch(pdfUrl);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json(); // Parse response as JSON

                if (!data.items || !data.items[0]?.report_pdf) {
                    throw new Error("Missing 'report_pdf' field in response");
                }

                const base64String = data.items[0].report_pdf;

                // Decode Base64 string
                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "application/pdf" });

                // Create and trigger file download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Invoice_${invoiceNo}.pdf`;
                document.body.appendChild(a);
                a.click();

                // Cleanup
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading PDF:", error);
                alert("Failed to download the PDF. Please try again.");
            }
        }
    };



    const exportToCSV = () => {
        if (tableData.length === 0) {
            setOpenAlert(true); 
            setAlertMsg("No data to expor")
            return;
        }
    
        // Define manual mappings for key fields
        const columnMappings: Record<string, string> = {
            customer_trx_id: "Customer Transaction ID",
            customer_id: "Customer ID",
            customer_name: "Customer Name",
            invoice_number: "Invoice Number",
            invoice_date: "Invoice Date",
            due_date: "Due Date",
            transaction_amount: "Transaction Amount ($)",
            tax_amount: "Tax Amount ($)",
            discount_amount: "Discount Amount ($)",
            total_amount: "Total Amount ($)",
            payment_status: "Payment Status",
            payment_method: "Payment Method",
            transaction_id: "Transaction ID",
            currency_code: "Currency",
            exchange_rate: "Exchange Rate",
            billing_address: "Billing Address",
            shipping_address: "Shipping Address",
            contact_email: "Contact Email",
            contact_phone: "Contact Phone",
            created_by: "Created By",
            last_updated_by: "Last Updated By",
            created_date: "Created Date",
            last_updated_date: "Last Updated Date",
            notes: "Notes",
            status: "Status"
            
        };
    
        // Function to convert snake_case or camelCase to Title Case
        const formatColumnName = (key: string): string => {
            return key
                .replace(/_/g, " ") // Replace underscores with spaces
                .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters (camelCase)
                .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
        };
    
        // Generate headers dynamically
        const headers = Object.keys(tableData[0])
            .map(key => columnMappings[key] || formatColumnName(key)) // Use mapping or auto-format
            .join(",") + "\n";
    
        // Format rows properly
        const rows = tableData
            .map(row => Object.values(row).map(value => `"${value}"`).join(","))
            .join("\n");
    
        const csvContent = headers + rows;
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
    
        // Create and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "InvoiceInformation.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    
    
    




    console.log("tableData", tableData)
    return (
        <Box sx={{ width: '100%' }}    >
            <Snackbar open={openAlert} autoHideDuration={10000} onClose={() => setOpenAlert(false)}>
                <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: "100%" }}>
                    {alertMsg}
                </Alert>
            </Snackbar>

            <Paper sx={{ p: 2, mb: 2 }} className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <Grid container spacing={2}>
                    {/* Customer Name */}
                    <Grid item xs={2}>
                        <Autocomplete
                            className='dark:!border-white'
                            options={Array.from(new Set(tableData.map((row) => row.customer_name || "")))}
                            value={filters.customer_name || ""}
                            onChange={(_event: React.SyntheticEvent, newValue: string | null) => handleFilterChange('customer_name', newValue || "")}
                            getOptionLabel={(option: string) => option || ""}
                            renderInput={(params) => <TextField {...params} label="Customer Name" fullWidth />}
                        />
                    </Grid>

                    {/* Invoice Number */}
                    <Grid item xs={2}>
                        <Autocomplete
                            options={Array.from(new Set(tableData.map((row) => String(row.invoice_number || ""))))} // Convert to string
                            value={String(filters.invoice_number || "")} // Convert to string
                            onChange={(_event: React.SyntheticEvent, newValue: string | null) =>
                                handleFilterChange("invoice_number", newValue || "")
                            }
                            getOptionLabel={(option) => String(option)} // Ensure it returns a string
                            renderInput={(params) => <TextField {...params} label="Invoice No." fullWidth />}
                        />
                    </Grid>

                    {/* Supplier */}
                    <Grid item xs={2}>
                        <Autocomplete
                            options={Array.from(new Set(tableData.map((row) => row.supplier_name || "")))}
                            value={filters.supplier_name || ""}
                            onChange={(_event: React.SyntheticEvent, newValue: string | null) => handleFilterChange('supplier_name', newValue || "")}
                            getOptionLabel={(option: string) => option || ""}
                            renderInput={(params) => <TextField {...params} label="Supplier" fullWidth />}
                        />
                    </Grid>

                    {/* From Date */}
                    <Grid item xs={2} sx={{ minWidth: 180 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <DatePicker
                                label="From Issue Date"
                                value={filters.fromDate ?? null}
                                onChange={(newValue: Date | null) => handleFilterChange('fromDate', newValue)}
                                slotProps={{ textField: { fullWidth: true } }} // Use slotProps for TextField customization
                            />

                        </LocalizationProvider>
                    </Grid>

                    {/* To Date */}
                    <Grid item xs={2} sx={{ minWidth: 180 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <DatePicker
                                label="To Issue Date"
                                value={filters.toDate}
                                onChange={(newValue: Date | null) => handleFilterChange('toDate', newValue)}
                                slotProps={{ textField: { fullWidth: true } }} // Updated way to pass props to TextField
                            />
                        </LocalizationProvider>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={2}>
                        <Autocomplete
                            options={Array.from(new Set(tableData.map((row) => row.clearance_status || "")))}
                            value={filters.clearance_status || ""}
                            onChange={(_event: React.SyntheticEvent, newValue: string | null) => handleFilterChange('clearance_status', newValue || "")}
                            renderInput={(params) => <TextField {...params} label="Status" fullWidth />}
                        />
                    </Grid>

                    <Grid item xs={12} textAlign="right">
                        <Button
                            className='bg-[#c84b3a] hover:bg-[#c84b3add] text-white'
                            variant="outlined"
                            color="inherit"
                            onClick={handleSearch}
                            sx={{ mx: 1 }}
                            startIcon={<SearchIcon />}
                        >
                            Search
                        </Button>

                        <Button
                            className='bg-[#c84b3a] hover:bg-[#c84b3add] text-white'
                            variant="outlined"
                            color="inherit"
                            onClick={handleReset}
                            sx={{ mx: 1 }}
                            startIcon={<RestartAltIcon />}
                        >
                            Reset
                        </Button>

                        <Button
                            className='bg-[#c84b3a] hover:bg-[#c84b3add] text-white'
                            variant="outlined"
                            color="inherit"
                            sx={{ mx: 1 }}
                            onClick={exportToCSV}
                            startIcon={<FileDownloadIcon />}
                        >
                            Export
                        </Button>

                        <Button
                            className='bg-[#c84b3a] hover:bg-[#c84b3add] text-white'
                            variant="outlined"
                            color="inherit"
                            sx={{ mx: 1 }}
                            // onClick={exportToPDF}
                            onClick={() => handleDownload(isInvoiceId)}
                            startIcon={<PictureAsPdfIcon />}
                        >
                            Download PDF
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {loading ? <Paper
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
                sx={{ width: '100%', p: 2, textAlign: 'center' }}>
                <Box className="flex justify-center items-center h-[200px]">
                    <CircularProgress size={30} />
                    {/* <Skeleton variant="text" width="100%" height={500} /> */}
                </Box>
            </Paper> :
                <Paper sx={{ width: '100%' }}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] "
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {tableData.length > 0 &&
                                        Object.keys(tableData[0]).map((key) => (
                                            <TableCell key={key} sx={{ fontWeight: 'bold', textTransform: 'capitalize', minWidth: 120, borderRight: '1px solid #ddd', padding: '8px' }}>
                                                {/* <TableSortLabel
                                                    active={orderBy === key}
                                                    direction={orderBy === key ? order : 'asc'}
                                                    onClick={() => handleRequestSort(null, key)}
                                                >
                                                    {key.replace(/_/g, ' ')}
                                                </TableSortLabel> */}

                                                <TableSortLabel
                                                    className='dark:text-white'

                                                    active={orderBy === key}
                                                    direction={orderBy === key ? order : 'asc'}
                                                    onClick={(event) => handleRequestSort(event, key)} // Capture the event properly
                                                >
                                                    {key.replace(/_/g, ' ')}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                </TableRow>
                            </TableHead>



                            <TableBody>
                                {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <TableRow
                                        className="hover:bg-gray-300"
                                        key={index}
                                        sx={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedRow === row.customer_trx_id ? '#d3d3d3' : 'transparent'
                                        }}
                                    >
                                        {Object.entries(row).map(([key, cell], cellIndex) => (
                                            <TableCell
                                                key={cellIndex}
                                                className={`"dark:text-white " ${key === 'clearance_status' ? 'hover:underline text-blue-500' : ''}`}
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    padding: '8px',
                                                    fontWeight: 'normal',
                                                    textTransform: 'uppercase',
                                                    minWidth: 120,
                                                    borderRight: '1px solid #ddd',

                                                }}
                                                onClick={key === 'clearance_status' ? () => { setModalOpen(true); handleRowClick(row.customer_trx_id); setInvoiceId(row.invoice_number || ""); } : undefined}
                                                style={{ cursor: key === 'clearance_status' ? 'pointer' : 'default' }}
                                            >
                                                {cell}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                    />
                </Paper>

            }


            {/* <Box className="mt-10">
                <Accordion defaultExpanded >
                    <AccordionSummary
                        className='!bg-slate-200 '
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography className=' !font-medium !capitalize' component="span">Detailed Error Messages</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DetailTable data={tableDataSingle as DataRow[]} loading={loadingDT} />
                    </AccordionDetails>
                </Accordion>
            </Box> */}


            {/* DetailTable inside Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
                className='!w-[80%] '
            >
                <div className="p-5 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Detailed Error Messages</h2>
                    <DetailTable data={tableDataSingle as DataRow[]} loading={loadingDT} />
                </div>
            </Modal>
        </Box>
    );
}