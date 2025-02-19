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

    <Charts />
      {/* Accordion */}
      {/* <Box className="mb-6" >
        <Accordion defaultExpanded className="graph-accordion mb-6">
          <AccordionSummary
            expandIcon={
              <ArrowDownwardIcon
                sx={{
                  backgroundColor: "#c84b3a", // Light gray background
                  color: '#fff',
                  borderRadius: "50%", // Makes it a circle
                  padding: "6px", // Spacing around the icon
                  fontSize: "1.2rem", // Adjust icon size
                  width: "32px", // Fixed width
                  height: "32px", // Fixed height
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
          
          </AccordionSummary>


          <AccordionDetails>
            <div className="grid grid-cols-12 gap-4 md:gap-5  ">
              <div className="col-span-10 space-y-6 xl:col-span-10">
                <div className="grid grid-cols-12 gap-4 md:gap-5 ">
                  <div className="col-span-12 space-y-6 xl:col-span-4">
                    <BarChartCleared />
                  </div>
                  <div className="col-span-12 space-y-6 xl:col-span-4">
                    <BarChartClearedUncleared />
                  </div>
                  <div className="col-span-12 space-y-6 xl:col-span-4">
                    <TopCustomersPieChart />
                  </div>
                </div>
              </div>
              <div className="col-span-2 space-y-6 xl:col-span-2 ">
                <div className="col-span-12 space-y-6 xl:col-span-3">
                  <EcommerceMetrics />
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box> */}


      {/* <TwoColumnLayout /> */}

      {/* <div className="grid grid-cols-12 gap-4 md:gap-5 mb-6">
        <div className="col-span-10 space-y-6 xl:col-span-10">
          <div className="grid grid-cols-12 gap-4 md:gap-5 ">
            <div className="col-span-12 space-y-6 xl:col-span-4">
              <BarChartCleared />
            </div>
            <div className="col-span-12 space-y-6 xl:col-span-4">
              <BarChartClearedUncleared />
            </div>
            <div className="col-span-12 space-y-6 xl:col-span-4">
              <TopCustomersPieChart />
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-6 xl:col-span-2 ">
          <div className="col-span-12 space-y-6 xl:col-span-3">
            <EcommerceMetrics />
          </div>
        </div>
      </div> */}



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
