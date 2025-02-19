"use client"

import { useState } from "react";
import BarChartCleared from "./BarChartCleared";
import TopCustomersPieChart from "./TopCustomersPieChart";
import { EcommerceMetrics } from "./EcommerceMetrics";
import BarChartClearedUncleared from "./BarChartClearedUncleared";

export default function TwoColumnLayout() {
  const [active, setActive] = useState<"left" | "right" | null>(null);

  return (
    <div className="flex h-screen gap-2 p-2 transition-all">
      {/* Left Section */}
      <div
        className={`transition-all duration-500 rounded-lg p-5 bg-blue-500 text-white flex items-center justify-center cursor-pointer ${
          active === "left" ? "w-3/4" : active === "right" ? "w-1/4" : "w-1/2"
        }`}
        onClick={() => setActive("left")}
      >
        {/* <h2 className="text-xl font-semibold">Left Section</h2> */}

              <div className="grid grid-cols-12 gap-4 md:gap-5 mb-6">
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
      </div>

      {/* Right Section */}
      <div
        className={`transition-all duration-500 rounded-lg p-5 bg-green-500 text-white flex items-center justify-center cursor-pointer ${
          active === "right" ? "w-3/4" : active === "left" ? "w-1/4" : "w-1/2"
        }`}
        onClick={() => setActive("right")}
      >
        <h2 className="text-xl font-semibold">Right Section</h2>
      </div>
    </div>
  );
}
