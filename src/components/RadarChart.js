import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

const data = {
  labels: ["Errors", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
  datasets: [
    {
      label: "Schudule 1",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Schudule 2",
      data: [3, 2, 4, 1, 6, 9],
      backgroundColor: "rgba(0, 99, 132, 0.2)",
      borderColor: "rgba(0, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scale: {
    ticks: { beginAtZero: true },
  },
  maintainAspectRatio: false,
};

class RadarChart extends React.Component {
  render() {
    return <Radar data={data} options={options} width={600} height={600} />;
  }
}

export default RadarChart;
