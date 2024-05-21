"use client";

import SellerLayout from "@/app/components/SellerLayout";
import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

const Dashboard = () => {
  const revenueChart = useRef(null);
  const socialTrafficChart = useRef(null);

  useEffect(() => {
    const revenueChart = revenueChartHandler();
    const socialTrafficChart = socialTrafficChartHanlder();

    return () => {
      revenueChart.destroy();
      socialTrafficChart.destroy();
    };
  }, []);

  const revenueChartHandler = () => {
    const chart = revenueChart.current.getContext("2d");
    const data = [
      { month: "Jan", revenue: 2000000 },
      { month: "Feb", revenue: 500000 },
      { month: "Mar", revenue: 800000 },
      { month: "Apr", revenue: 600000 },
      { month: "May", revenue: 700000 },
      { month: "Jun", revenue: 610000 },
      { month: "Jul", revenue: 320000 },
      { month: "Aug", revenue: 550000 },
      { month: "Sep", revenue: 324000 },
      { month: "Oct", revenue: 900000 },
      { month: "Nov", revenue: 870000 },
      { month: "Dec", revenue: 2500000 },
    ];

    let chartInstance = new Chart(chart, {
      type: "line",
      data: {
        labels: data.map((row) => row.month),
        datasets: [
          {
            label: "Revenue in 2023",
            data: data.map((row) => row.revenue),
            borderColor: "#00f445",
            backgroundColor: "#00f445",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return chartInstance;
  };

  const socialTrafficChartHanlder = () => {
    const chart = socialTrafficChart.current.getContext("2d");

    const data = [
      { socialMedia: "Facebook", orders: 200 },
      { socialMedia: "Twitter", orders: 150 },
      { socialMedia: "Tiktok", orders: 500 },
    ];

    let chartInstance = new Chart(chart, {
      type: "doughnut",
      data: {
        labels: data.map((row) => row.socialMedia),
        datasets: [
          {
            label: "Total Orders",
            data: data.map((row) => row.orders),
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return chartInstance;
  };

  return (
    <>
      <SellerLayout>
        <div className="w-full h-screen">
          <header>
            <h1 className="text-2xl font-bold text-slate-600">Dashboard</h1>
          </header>
          <div className="w-full h-max flex gap-3 mt-5 flex-wrap">
            <div className="w-[25rem] h-[9rem] flex flex-col justify-between shadow-sm border-[1px] border-slate-200 px-5 py-4 rounded-lg bg-white">
              <header className="flex justify-between items-center">
                <h3 className="font-medium text-slate-600">Sales Total</h3>
                <div className="relative p-2 flex gap-1 [&>*]:w-[5px] [&>*]:h-[5px] [&>*]:rounded-full [&>*]:border-[2px] [&>*]:border-slate-600 hover:bg-slate-200 rounded-lg transition-all cursor-pointer">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </header>
              <main className="flex justify-between">
                <h3 className="font-bold text-md text-slate-700 mt-3">
                  Rp. 1.000.000.000
                </h3>
                <div className="flex flex-col items-end text-[.7rem]">
                  <span className="text-green-600">
                    <ion-icon name="arrow-up-outline"></ion-icon> 25%
                  </span>
                  <span className="text-slate-500">
                    Compared to Desember 2022
                  </span>
                </div>
              </main>
            </div>
            <div className="w-[25rem] h-[9rem] flex flex-col justify-between shadow-sm border-[1px] border-slate-200 px-5 py-4 rounded-lg bg-white">
              <header className="flex justify-between items-center">
                <h3 className="font-medium text-slate-600">Total Orders</h3>
                <div className="relative p-2 flex gap-1 [&>*]:w-[5px] [&>*]:h-[5px] [&>*]:rounded-full [&>*]:border-[2px] [&>*]:border-slate-600 hover:bg-slate-200 rounded-lg transition-all cursor-pointer">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </header>
              <main className="flex justify-between">
                <h3 className="font-bold text-md text-slate-700 mt-3">100</h3>
                <div className="flex flex-col items-end text-[.7rem]">
                  <span className="text-pink-600">
                    <ion-icon name="arrow-down-outline"></ion-icon> 25%
                  </span>
                  <span className="text-slate-500">
                    Compared to Desember 2022
                  </span>
                </div>
              </main>
            </div>
            <div className="w-[25rem] h-[9rem] flex flex-col justify-between shadow-sm border-[1px] border-slate-200 px-5 py-4 rounded-lg bg-white">
              <header className="flex justify-between items-center">
                <h3 className="font-medium text-slate-600">Accept Order</h3>
                <div className="relative p-2 flex gap-1 [&>*]:w-[5px] [&>*]:h-[5px] [&>*]:rounded-full [&>*]:border-[2px] [&>*]:border-slate-600 hover:bg-slate-200 rounded-lg transition-all cursor-pointer">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </header>
              <main className="flex justify-between">
                <h3 className="font-bold text-md text-slate-700 mt-3">100</h3>
                <div className="flex flex-col items-end text-[.7rem]">
                  <span className="text-pink-600">
                    <ion-icon name="arrow-down-outline"></ion-icon> 25%
                  </span>
                  <span className="text-slate-500">
                    Compared to Desember 2022
                  </span>
                </div>
              </main>
            </div>
            <div className="w-[25rem] h-[9rem] flex flex-col justify-between shadow-sm border-[1px] border-slate-200 px-5 py-4 rounded-lg bg-white">
              <header className="flex justify-between items-center">
                <h3 className="font-medium text-slate-600">Unsend Order</h3>
                <div className="relative p-2 flex gap-1 [&>*]:w-[5px] [&>*]:h-[5px] [&>*]:rounded-full [&>*]:border-[2px] [&>*]:border-slate-600 hover:bg-slate-200 rounded-lg transition-all cursor-pointer">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </header>
              <main className="flex justify-between">
                <h3 className="font-bold text-md text-slate-700 mt-3">100</h3>
                <div className="flex flex-col items-end text-[.7rem]">
                  <span className="text-pink-600">
                    <ion-icon name="arrow-down-outline"></ion-icon> 25%
                  </span>
                  <span className="text-slate-500">
                    Compared to Desember 2022
                  </span>
                </div>
              </main>
            </div>
            <div className="w-[25rem] h-[9rem] flex flex-col justify-between shadow-sm border-[1px] border-slate-200 px-5 py-4 rounded-lg bg-white">
              <header className="flex justify-between items-center">
                <h3 className="font-medium text-slate-600">Return Order</h3>
                <div className="relative p-2 flex gap-1 [&>*]:w-[5px] [&>*]:h-[5px] [&>*]:rounded-full [&>*]:border-[2px] [&>*]:border-slate-600 hover:bg-slate-200 rounded-lg transition-all cursor-pointer">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </header>
              <main className="flex justify-between">
                <h3 className="font-bold text-md text-slate-700 mt-3">100</h3>
                <div className="flex flex-col items-end text-[.7rem]">
                  <span className="text-pink-600">
                    <ion-icon name="arrow-down-outline"></ion-icon> 25%
                  </span>
                  <span className="text-slate-500">
                    Compared to Desember 2022
                  </span>
                </div>
              </main>
            </div>
          </div>
          <div className="w-full h-max flex gap-5 mt-5">
            <div className="w-[60%] min-h-[26rem] bg-white border-[1px] border-slate-200 shadow-sm rounded-lg py-4 px-5">
              <header className="w-full flex items-center justify-between">
                <h3 className="text-slate-600">Revenue</h3>
                <div className="relative p-2 flex gap-1 [&>*]:w-[5px] [&>*]:h-[5px] [&>*]:rounded-full [&>*]:border-[2px] [&>*]:border-slate-600 hover:bg-slate-200 rounded-lg transition-all cursor-pointer">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </header>
              <main className="w-full h-full">
                <canvas ref={revenueChart}></canvas>
              </main>
            </div>
            <div className="w-[40%] min-h-[26rem] bg-white border-[1px] border-slate-200 shadow-sm rounded-lg py-4 px-5">
              <header className="w-full flex items-center justify-between">
                <h3 className="text-slate-600">Revenue</h3>
                <div className="relative p-2 flex gap-1 [&>*]:w-[5px] [&>*]:h-[5px] [&>*]:rounded-full [&>*]:border-[2px] [&>*]:border-slate-600 hover:bg-slate-200 rounded-lg transition-all cursor-pointer">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </header>
              <main className="w-full h-full">
                <canvas ref={socialTrafficChart}></canvas>
              </main>
            </div>
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default Dashboard;
