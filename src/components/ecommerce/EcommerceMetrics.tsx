"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
import { Receipt } from '@mui/icons-material';

export const EcommerceMetrics = () => {
  return (
    <div className="grid grid-rows-1 gap-4 sm:grid-rows-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 !min-h-14 ">
          Latest Invoice
        </h3>
        <div className="flex items-end justify-between mt-5">
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            3,782
          </h4>
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <Receipt className="text-[#c84b3a] size-6 dark:text-white/90" />
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 !min-h-14 ">
          Today's Invoice Count
        </h3>
        <div className="flex items-end justify-between mt-5">

          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            5,359
          </h4>
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <Receipt className="text-[#c84b3a] dark:text-white/90" />
          </div>

        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
