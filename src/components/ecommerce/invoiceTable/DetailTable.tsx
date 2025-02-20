import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress } from "@mui/material";

interface DataRow {
  process_date: string;
  error_type: string;
  error_code: string;
  error_category: string;
  error_message: string;
  error_status: string;
}

interface DetailTableProps {
  data: DataRow[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: "process_date", headerName: "Process Date", width: 150 },
  { field: "error_type", headerName: "Error Type", width: 120 },
  { field: "error_code", headerName: "Error Code", width: 180 },
  { field: "error_category", headerName: "Error Category", width: 120 },
  { field: "error_status", headerName: "Error Status", width: 120 },
  {
    field: "error_message",
    headerName: "Error Message",
    width: 1000, // Adjust width as needed
    renderCell: (params) => {
      return (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "200px", // Optional: Limit height to avoid excessive row height
            lineHeight: "1.4",
          }}
        >
          {params.value}
        </div>
      );
    },
  },
];

const DetailTable: React.FC<DetailTableProps> = ({ data, loading }) => {
  return (
    <>
      {loading ? (
        <Paper
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
          sx={{ width: '100%', p: 2, textAlign: 'center' }}>
          <Box className="flex justify-center items-center h-[20px]">
            <CircularProgress size={30} />
          </Box>
        </Paper>
      ) : (
        <Paper
          sx={{
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {data.length > 0 ? (
            <DataGrid
              rows={data.map((item, index) => ({ id: index + 1, ...item }))}
              columns={columns}
              sx={{
                border: "1px solid #ddd",
                height: "auto",
                "& .MuiDataGrid-cell": {
                  borderRight: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "normal", // Ensures text wraps
                },
                "& .MuiDataGrid-row": {
                  borderBottom: "1px solid #ddd",
                },
              }}
            />
          ) : (
            <p className="p-3">No data to display.</p>
          )}
        </Paper>
      )}
    </>
  );
};

export default DetailTable;
