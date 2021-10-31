import React, { Component } from "react";
import RadarChart from "./RadarChart";
import Doughtnut from "./Doughtnut";
import { Row, Col } from "antd";

class VisualizationSite extends React.Component {
  render() {
    return (
      <div className="graphPanel">
        <ul>
          <li>
            <RadarChart />
          </li>
          <li>
            <Doughtnut />
          </li>
        </ul>
      </div>
    );
  }
}

export default VisualizationSite;
