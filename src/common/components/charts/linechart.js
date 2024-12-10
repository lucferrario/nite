import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function LineChart({ chartData, chartOptions }) {
  return <Line data={chartData} options={chartOptions} />;
}

export default LineChart;
