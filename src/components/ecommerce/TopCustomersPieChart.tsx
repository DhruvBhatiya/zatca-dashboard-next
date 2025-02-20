"use client";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define API response type
interface CustomerData {
  customer_name: string;
  invoice_total_amt: number;
}

export default function TopCustomersPieChart() {
  const [data, setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://130.61.209.11:8080/ords/zatca/zatca_prod/TopFiveCustomers")
      .then((response) => response.json())
      .then((result) => {
        if (result.items) {
          setData(result.items);
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);


  const options: ApexOptions = {
    chart: {
      type: "pie",
      height: 315,
    },
    labels: data.map((d) => d.customer_name),
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: (val: number) => `SAR ${val.toLocaleString()}`,
      },
      custom: ({ seriesIndex, w }) => {
        return `<div style="
                    color: white; 
                    padding: 8px; 
                    border-radius: 5px;  
                    font-size: 10px; 
                    line-height: 13px;
                    text-align: left;
                    max-width: 150px; 
                    white-space: normal;
                  ">
                  <strong>${w.globals.labels[seriesIndex]}</strong>:<br/> 
                  SAR ${w.globals.series[seriesIndex].toLocaleString()}
                </div>`;
      },
      
    },
  };
  


  const series = data.map((d) => d.invoice_total_amt);
console.log("series",series)
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] min-h-[300px] h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 !min-h-14">
        Top 5 Customers by Invoice Value
      </h3>

      {loading ? (
        <Box className="flex justify-center items-center h-[300px]">
          <CircularProgress size={30} />
        </Box>

      ) : (
        <ReactApexChart options={options} series={series} type="pie" height={315} />
      )}
    </div>
  );
}


// donut