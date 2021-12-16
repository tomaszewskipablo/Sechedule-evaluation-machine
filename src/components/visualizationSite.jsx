import React, { Component } from "react";
import RadarChart from "./RadarChart";
import Doughtnut from "./Doughtnut";
import BarChart from "./BarChart";
import BarChartSeatsPerClass from "./BarChartSeatsPerClass";
import { Checkbox, Button } from "antd";
import { stringLiteral } from "@babel/types";

let names = ["adam", "pawel", "gergly", "person", "abc"];

const a = [10, 20, 20, 20, 11, 10]; // adams

const b = [13, 10, 3, 6, 2, 11]; // pawel

const c = [6, 7, 4, 5, 3];
const d = [2, 2, 4, 4, 4];
const abc = [4, 7, 8, 11, 2];

let apiData = [];

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
const final = [];

let data = {
  labels: [
    "Free classes, at least 2 hours",
    "Free classes, whole day",
    "Matching rate",
    "Some statistics",
    "Some statistics",
    "Some statistics",
  ],
  datasets: final,
};

class VisualizationSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleNames: [],
      isLoaded: false,
      scheduleNamescheckedValues: [],
      data,
    };
  }

  componentDidMount() {
    fetch(
      "http://ec2-3-70-254-32.eu-central-1.compute.amazonaws.com:5000/s3_files"
    )
      .then((res) => res.json())
      .then((json) => {
        const filesNamesArrayToTrim = json
          .replace("[", "")
          .replace("]", "")
          .replace(/\\"/g, "")
          .replace(/"/g, "")
          .split(",");

        this.setState({
          scheduleNames: filesNamesArrayToTrim.map((x) => x.trim()),
        });
        // console.log(this.state.scheduleNames);
      });
  }

  fetchData = async () => {
    if (this.state.scheduleNamescheckedValues.length > 0) {
      this.setState({
        isLoaded: true,
      });
    } else {
      this.setState({
        isLoaded: false,
      });
    }
    names = this.state.scheduleNamescheckedValues;

    apiData = [];
    this.state.scheduleNamescheckedValues.forEach((element) => {
      console.log("Wyswietlam element: ", element);
      let base =
        "http://ec2-3-70-254-32.eu-central-1.compute.amazonaws.com:5000/radarplotmetrics?schedule_filename=";
      let endpoint = base.concat(element);

      const res = await fetch(endpoint);
      const dt = await res.json();
      apiData.push(dt);
      // .then((resa) => resa.json())
      // .then((json) => {
      //   json = Object.values(json);
      //   apiData.push(json);
      // });
    });
  };

  getVisualizeData = () => {
    this.fetchData();
    this.state.data = this.provideRadarData();
  };

  updateCheckedValueList = (checkedValuesList) => {
    this.setState({
      scheduleNamescheckedValues: checkedValuesList,
    });
  };

  provideRadarData = () => {
    arrayMain = [];
    for (let i = 0; i < apiData.length; i++) {
      const arrayN = [];
      for (let j = 0; j < a.length; j++) {
        arrayN.push(apiData[i][j]);
      }
      arrayMain.push(arrayN);
    }

    for (let j = 0; j < arrayMain.length; j++) {
      const obj = {
        label: this.state.scheduleNamescheckedValues[j],
        data: arrayMain[j],
        backgroundColor: colors[j],
        borderColor: colorsBorder[j],
        borderWidth: 1,
      };
      final.push(obj);
    }

    return {
      labels: [
        "Free classes, at least 2 hours",
        "Free classes, whole day",
        "Matching rate",
        "Some statistics",
        "Some statistics",
        "Some statistics",
      ],
      datasets: final,
    };

    console.log("To jest nowy state, powinien byc update: ", this.state.data);
  };

  render() {
    var { isLoaded, scheduleNames, checkedValues, data } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <Checkbox.Group
            options={scheduleNames}
            onChange={this.updateCheckedValueList}
          />
          <Button onClick={this.getVisualizeData}>Confirm</Button>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div>
            <Checkbox.Group
              options={scheduleNames}
              onChange={this.updateCheckedValueList}
            />
            <Button onClick={this.getVisualizeData}>Confirm</Button>
          </div>
          <div className="graphPanel">
            <ul>
              <li>Radar plot</li>
              <li>Number of overbooked classes</li>
            </ul>
            <ul>
              <li>
                <RadarChart data={this.state.data} />
              </li>
              <li>
                <Doughtnut labels={names} data={[12, 19, 3, 5, 2]} />
              </li>
            </ul>
            <BarChart />
            <BarChartSeatsPerClass />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default VisualizationSite;
