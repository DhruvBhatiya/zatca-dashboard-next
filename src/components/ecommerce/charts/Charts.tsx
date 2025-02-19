"use client"

import { useState } from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BarChartCleared from "../BarChartCleared";
import TopCustomersPieChart from "../TopCustomersPieChart";
import { EcommerceMetrics } from "../EcommerceMetrics";
import BarChartClearedUncleared from "../BarChartClearedUncleared";


const arrowIconStyles = {
    backgroundColor: "#c84b3a",
    color: "#fff",
    borderRadius: "50%",
    padding: "6px",
    fontSize: "1.2rem",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: 'pointer'
};

const Charts = () => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(true); // Controls the Accordion state

    return (
        <Box className="">
            {/* External Button to Toggle Accordion */}


            <Accordion expanded={isAccordionOpen} className="graph-accordion mb-6">
                <AccordionSummary
                    expandIcon={
                        <ArrowDownwardIcon
                            sx={{ display: 'none' }}
                        />
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)} // Also allows clicking on header
                >
                    <h3 className="uppercase text-lg font-semibold text-gray-800 dark:text-white/90 ">
                        Zatca E-Invoices
                    </h3>
                </AccordionSummary>

                <AccordionDetails>
                    <div className="grid grid-cols-12 gap-4 md:gap-5 pb-6">
                        <div className="col-span-10 space-y-6 xl:col-span-10">
                            <div className="grid grid-cols-12 gap-4 md:gap-5">
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
                        <div className="col-span-2 space-y-6 xl:col-span-2">
                            <div className="col-span-12 space-y-6 xl:col-span-3">
                                <EcommerceMetrics />
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Box className={' w-full flex justify-center items-center relative -top-9'}>
                {isAccordionOpen ?
                    <ArrowUpwardIcon onClick={() => setIsAccordionOpen(!isAccordionOpen)} sx={arrowIconStyles} />
                    :
                    <ArrowDownwardIcon
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        sx={arrowIconStyles}
                    />
                }
            </Box>

        </Box>
    );
};

export default Charts;
