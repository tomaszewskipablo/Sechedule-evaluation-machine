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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The number of classes per day",
    },
  },
};

const labels = [
  "Monday",
  "Thusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dataS = {
  labels,
  datasets: [],
};

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataJson: props.dataJson,
      scheduleNames: props.scheduleNames,
      data: {
        labels,
        datasets: [],
      },
      updated: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.dataJson === 0) dataS.datasets.length = 0;
    else {
      for (let i = 0; i < this.props.scheduleNames.length; i++) {
        let obj = {
          label: "",
          data: [],
          backgroundColor: "",
          borderColor: "",
          borderWidth: 1,
        };

        obj.label = this.props.scheduleNames[i];
        obj.data =
          this.props.dataJson["number_of_classes_for_each_day"][
            "number_of_classes"
          ];

        obj.backgroundColor = colors[i];
        obj.borderColor = colorsBorder[i];
        dataS.datasets.push(obj);
      }
      this.state.data = dataS;
      console.log("sdasd ", this.state.data);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Bar options={options} data={this.state.data} />
      </React.Fragment>
    );
  }
}
export default BarChart;
