import React from "react";
import { Doughnut } from "react-chartjs-2";

let data;

class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: props.labels,
      data: props.data,
    };
    console.log(props.labels, props.data);
    this.provideData(props.labels, props.data);
  }

  provideData = (labels, dataNew) => {
    data = {
      labels: labels,
      datasets: [
        {
          data: dataNew,
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
  };

  render() {
    return (
      <React.Fragment>
        <Doughnut
          data={data}
          options={{ maintainAspectRatio: false }}
          style={{ height: "860px", width: "840px" }}
        />
      </React.Fragment>
    );
  }
}

export default DoughnutChart;
