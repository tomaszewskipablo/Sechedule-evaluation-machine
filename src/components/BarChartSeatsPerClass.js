import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "none",
    },
    title: {
      display: true,
      text: "Number of classrooms and sits",
    },
  },
};

const labels = [
  "400",
  "355",
  "350",
  "300",
  "150",
  "200",
  "44",
  "33",
  "31",
  "29",
  "26",
  "23",
  "22",
  "18",
  "14",
  "11",
  "10",
  "5",
  "4",
];

export const data = {
  labels,
  datasets: [
    {
      label: "pawel",
      data: [
        10, 0, 11, 5, 3, 2, 8, 8, 9, 2, 10, 9, 2, 14, 16, 22, 14, 12, 33, 12, 2,
        3, 11,
      ],
      backgroundColor: "rgba(100,100, 100, 0.2)",
      borderColor: "rgba(100, 100, 100, 1)",
      borderWidth: 1,
    },
  ],
};

class BarChartSeatsPerClass extends React.Component {
  render() {
    return <Bar options={options} data={data} />;
  }
}
export default BarChartSeatsPerClass;
