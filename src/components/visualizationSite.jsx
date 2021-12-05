import React, { Component } from "react";
import RadarChart from "./RadarChart";
import Doughtnut from "./Doughtnut";
import BarChart from "./BarChart";
import BarChartSeatsPerClass from "./BarChartSeatsPerClass";

class VisualizationSite extends React.Component {
  render() {
    return (
      <div className="graphPanel">
        <ul>
          <li>Radar plot</li>
          <li>Number of overbooked classes</li>
        </ul>
        <ul>
          <li>
            <RadarChart />
          </li>
          <li>
            <Doughtnut />
          </li>
        </ul>
        <BarChart />
        <BarChartSeatsPerClass />
      </div>
    );
  }
}

export default VisualizationSite;
