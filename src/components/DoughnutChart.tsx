"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChartProps } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const chartData = {
    datasets: [
      {
        label: "Bank",
        data: [12500, 25000, 37500, 55000],
        backgroundColor: ["#0747b6", "#2265d8", "2f91fa"],
      },
    ],
    labels: ["Bank 1", "Bank 2", "Bank 3", "Bank 4"],
  };
  return (
    <Doughnut
      data={chartData}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
