import BarChartCleared from "@/components/ecommerce/BarChartCleared";
import BarChartClearedUncleared from "@/components/ecommerce/BarChartClearedUncleared";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MainTable from "@/components/ecommerce/invoiceTable/MainTable";
import TopCustomersPieChart from "@/components/ecommerce/TopCustomersPieChart";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import type { Metadata } from "next";
import TwoColumnLayout from "@/components/ecommerce/TwoColumnLayout";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import Charts from "@/components/ecommerce/charts/Charts";

export const metadata: Metadata = {
  title:
    "Zatca Dashboard",
  description: "Zatca Dashboard",
};

export default function Ecommerce() {


  return (

    <>

      {/* Accordion */}
      <Charts />


      <div className="grid grid-cols-12 gap-4 md:gap-6">

        {/* Table  */}
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <MainTable />
        </div>


        {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div> */}
      </div>
    </>
  );
}
