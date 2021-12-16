import React, { Component } from "react";
import ReactDensityPlot from "./ReactDensityPlot";
import GithubDensityPlot from "./Github-like-density-plot";

class DensitySite extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ReactDensityPlot/>
        <GithubDensityPlot/>
      </React.Fragment>
    );
  }
}

export default DensitySite;
