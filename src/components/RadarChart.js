import Item from "antd/lib/list/Item";
import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

const names = ["adam", "pawel", "gergly", "person", "abc"];

const a = [10, 20, 20, 20, 11]; // adams

const b = [13, 10, 3, 6, 2]; // pawel

const c = [6, 7, 4, 5, 3];
const d = [2, 2, 4, 4, 4];
const abc = [4, 7, 8, 11, 2];

const apiData = [a, b, c, d, abc];

const colors = [
  "rgba(0, 99, 132, 0.2)",
  "rgba(255, 99, 132, 0.2)",
  "rgba(0, 255, 0, 0.2)",
  "rgba(255, 99, 0, 0.2)",
  "rgba(13, 13, 13, 0.2)",
  "rgba(57, 22, 200, 0.2)",
  "rgba(140, 72, 100, 0.2)",
  "rgba(0, 200, 200, 0.2)",
  "rgba(255, 1, 67, 0.2)",
  "rgba(78, 78, 78, 0.2)",
  "rgba(0, 0, 0, 0.2)",
];
const colorsBorder = [
  "rgba(0, 99, 132, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(0, 255, 0, 1)",
  "rgba(255, 99, 0, 1)",
  "rgba(13, 13, 13, 1)",
  "rgba(57, 22, 200, 1)",
  "rgba(140, 72, 100, 1)",
  "rgba(0, 200, 200, 1)",
  "rgba(255, 1, 67, 1)",
  "rgba(78, 78, 78, 1)",
  "rgba(0, 0, 0, 1)",
];

let arrayMain = [];
for (let i = 0; i < apiData.length; i++) {
  const arrayN = [];
  for (let j = 0; j < a.length; j++) {
    arrayN.push(apiData[i][j]);
  }
  arrayMain.push(arrayN);
}

const final = [];
for (let j = 0; j < arrayMain.length; j++) {
  const obj = {
    label: names[j],
    data: arrayMain[j],
    backgroundColor: colors[j],
    borderColor: colorsBorder[j],
    borderWidth: 1,
  };
  final.push(obj);
}

let data = {
  labels: [
    "Free classes, at least 2 hours",
    "Free classes, whole day",
    "Matching rate",
    "Some statistics",
    "Some statistics",
  ],
  datasets: final,
};

const options = {
  scale: {
    ticks: { beginAtZero: true },
  },
  maintainAspectRatio: false,
};

class RadarChart extends React.Component {
  render() {
    return (
      <Radar
        data={data}
        options={options}
        style={{ height: "460px", width: "540px" }}
      />
    );
  }
}
export default RadarChart;
