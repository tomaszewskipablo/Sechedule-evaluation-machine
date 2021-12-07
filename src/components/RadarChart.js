import Item from "antd/lib/list/Item";
import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

const options = {
  scale: {
    ticks: { beginAtZero: true },
  },
  maintainAspectRatio: false,
};

class RadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  render() {
    return (
      <Radar
        data={this.state.data}
        options={options}
        style={{ height: "460px", width: "540px" }}
      />
    );
  }
}
export default RadarChart;
