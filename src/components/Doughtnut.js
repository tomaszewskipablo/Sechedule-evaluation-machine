import React from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["adam", "pawel", "gergly", "person", "abc"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(0, 99, 132, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(0, 255, 0, 0.2)",
        "rgba(255, 99, 0, 0.2)",
        "rgba(13, 13, 13, 0.2)",
        "rgba(57, 22, 200, 0.2)",
      ],
      borderColor: [
        "rgba(0, 99, 132, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(0, 255, 0, 1)",
        "rgba(255, 99, 0, 1)",
        "rgba(13, 13, 13, 1)",
        "rgba(57, 22, 200, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => (
  <React.Fragment>
    <Doughnut
      data={data}
      options={{ maintainAspectRatio: false }}
      style={{ height: "460px", width: "540px" }}
    />
  </React.Fragment>
);

export default DoughnutChart;
