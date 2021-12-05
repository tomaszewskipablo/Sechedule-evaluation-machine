import React from "react";
import { Menu, Dropdown, Button, Space } from "antd";

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
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The number of classes unused per day",
    },
  },
};

const labels = [
  "2021-12-01",
  "2021-12-02",
  "2021-12-03",
  "2021-12-04",
  "2021-12-05",
  "2021-12-06",
  "2021-12-07",
  "2021-12-08",
  "2021-12-09",
  "2021-12-10",
  "2021-12-11",
  "2021-12-12",
  "2021-12-13",
  "2021-12-14",
  "2021-12-15",
  "2021-12-16",
  "2021-12-17",
  "2021-12-18",
  "2021-12-19",
  "2021-12-21",
  "2021-12-22",
  "2021-12-23",
  "2021-12-24",
  "2021-12-25",
  "2021-12-26",
  "2021-12-27",
  "2021-12-28",
  "2021-12-29",
  "2021-12-30",
  "2021-12-31",
];

export const data = {
  labels,
  datasets: [
    {
      label: "adam",
      data: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 11, 20, 13, 2, 3, 4, 5, 1, 2, 4,
        5, 6, 7, 4, 2, 4, 6, 4,
      ],
      backgroundColor: "rgba(0, 99, 132, 0.2)",
      borderColor: "rgba(0, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "pawel",
      data: [
        10, 0, 11, 5, 3, 2, 8, 8, 9, 2, 11, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 3, 4, 5, 1, 2, 1,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "gergly",
      data: [
        10, 0, 11, 5, 3, 2, 8, 8, 7, 8, 9, 10, 11, 12, 3, 4, 5, 1, 2, 1, 9, 2,
        11, 8, 1, 2, 3, 4, 5, 6,
      ],
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      borderColor: "rgba(0, 255, 0, 1)",
      borderWidth: 1,
    },
    {
      label: "person",
      data: [
        1, 6, 11, 2, 10, 0, 11, 5, 3, 2, 8, 8, 9, 2, 2, 8, 1, 2, 3, 4, 5, 6, 7,
        8, 9, 10, 11, 12, 3, 4,
      ],
      backgroundColor: "rgba(255, 99, 0, 0.2)",
      borderColor: "rgba(255, 99, 0, 1)",
      borderWidth: 1,
    },
    {
      label: "abc",
      data: [
        2, 3, 4, 5, 10, 0, 11, 5, 3, 2, 8, 8, 9, 2, 5, 1, 11, 12, 3, 4, 2, 1,
        11, 8, 1, 6, 7, 8, 9, 10,
      ],
      backgroundColor: "rgba(13, 13, 13, 0.2)",
      borderColor: "rgba(13, 13, 13, 1)",
      borderWidth: 1,
    },
  ],
};

const menu = (
  <Menu>
    <Menu.Item>
      <a>January</a>
    </Menu.Item>
    <Menu.Item>
      <a>February</a>
    </Menu.Item>
    <Menu.Item>
      <a>March</a>
    </Menu.Item>
    <Menu.Item>
      <a>April</a>
    </Menu.Item>
    <Menu.Item>
      <a>May</a>
    </Menu.Item>
  </Menu>
);

class BarChart extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>December</Button>
        </Dropdown>

        <Bar options={options} data={data} />
      </React.Fragment>
    );
  }
}
export default BarChart;
