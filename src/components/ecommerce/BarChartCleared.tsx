"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Box, CircularProgress, Skeleton } from "@mui/material";

// Dynamically import ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Function to format large numbers
const formatNumber = (num: number) => {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
};

// Define API response type
interface InvoiceData {
  created_invoices_count: any;
  month_year: string;
  created: number;
  cleared_invoices_count: number;
}

export default function BarChartCleared() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://130.61.209.11:8080/ords/zatca/zatca_prod/InvoicePerMonth")
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
    colors: ["#465fff", "#82ca9d"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 300,
      toolbar: { show: false },

    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 5,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: data.map((d) => d.month_year),
      labels: {
        rotate: -90,
        style: { fontSize: "12px" },
      },
    },
    yaxis: {
      labels: { formatter: formatNumber },
    },
    tooltip: {
      y: { formatter: (val: number) => formatNumber(val) },

      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        return `<div style="color: white; padding: 0px; border-radius: 5px;  font-size: 10px; line-height: 13px">
                  ${w.globals.seriesNames[seriesIndex]}: <br /> ${series[seriesIndex][dataPointIndex]}
                </div>`;
      },
    },
    grid: {
      yaxis: { lines: { show: true } },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
  };

  const series = [
    { name: "Created Invoices", data: data.map((d) => d.created_invoices_count) },
    { name: "Cleared Invoices", data: data.map((d) => d.cleared_invoices_count) },
  ];

  console.log("data", data)

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] min-h-[300px] h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 !min-h-14">
          Month-wise Cleared Invoices Value
        </h3>

        {/* <div className="relative inline-block">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem
              onItemClick={() => setIsOpen(false)}
              className="flex w-full text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={() => setIsOpen(false)}
              className="flex w-full text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div> */}
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          {loading ? (
            <Box className="flex justify-center items-center h-[300px]">
              <CircularProgress size={30} />
              {/* <Skeleton variant="text" width="100%" height={500} /> */}
            </Box>

          ) : (
            <ReactApexChart options={options} series={series} type="bar" height={300} width={1000} />
          )}
        </div>
      </div>
    </div>
  );
}
