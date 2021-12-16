import React, { Component } from "react";
import RadarChart from "./RadarChart";
import Doughtnut from "./Doughtnut";
import BarChart from "./BarChart";
import BarChartSeatsPerClass from "./BarChartSeatsPerClass";
import { Checkbox, Button } from "antd";
import { stringLiteral } from "@babel/types";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    "Classes with unspecified date",
    "Free classrooms for min 2 hours",
    "Free classrooms for one day",
    "Overbooked classes",
    "Required room change for students",
    "Unused classroomss",
  ],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: "",
      borderColor: "",
      borderWidth: 1,
    },
  ],
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
      let base =
        "http://ec2-3-70-254-32.eu-central-1.compute.amazonaws.com:5000/radarplotmetrics?schedule_filename=";
      let endpoint = base.concat(element);

      fetch(endpoint)
        .then((resa) => resa.json())
        .then((json) => {
          json = Object.values(json);
          apiData.push(json);
          if (apiData.length == this.state.scheduleNamescheckedValues.length) {
            console.log(apiData);
            this.state.data = this.provideRadarData();
            this.forceUpdate();
          } else {
            console.log("a fetch returned, but it wasnt the last one");
          }
        });
    });
  };

  getVisualizeData = () => {
    this.fetchData();
  };

  updateCheckedValueList = (checkedValuesList) => {
    this.setState({
      scheduleNamescheckedValues: checkedValuesList,
    });
  };

  provideRadarData = () => {
    console.log("apiData: ", apiData);

    arrayMain = [];
    // count max array
    let max = [0, 0, 0, 0, 0, 0];
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < apiData.length; i++) {
        if (apiData[i][j] > max[j]) max[j] = apiData[i][j];
      }
    }
    console.log("max ", max);
    console.log("ApiData1 ", apiData);

    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < apiData.length; i++) {
        apiData[i][j] = (apiData[i][j] / max[j]) * 100;
      }
    }

    for (let j = 0; j < apiData.length; j++) {
      const obj = {
        label: this.state.scheduleNamescheckedValues[j],
        data: apiData[j],
        backgroundColor: colors[j],
        borderColor: colorsBorder[j],
        borderWidth: 1,
      };
      final.push(obj);
    }

    return {
      labels: [
        "Classes with unspecified date",
        "Free classrooms for min 2 hours",
        "Free classrooms for one day",
        "Overbooked classes",
        "Required room change for students",
        "Unused classroomss",
      ],
      datasets: final,
    };
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
          {/* <div>
            <ul>
              <li>Radar plot</li>
              <li>Number of overbooked classes</li>
            </ul>
            <ul>
              <li>
                
              </li>
              <li></li>
            </ul> */}
          <Container>
            <Row>
              <Col sm={9}>
                <RadarChart data={this.state.data} />
              </Col>
              <Col sm={3}>
                The radar plot values are given in percentage relatively to the
                highest value of the particular metric. So the Radar plot
                doesn't show the values inself, it shows comparision between
                metrics. It takes some time to calculate the values.{" "}
              </Col>
            </Row>
          </Container>
          {/* <div class="container">
            <div class="row">
              <div class="col-8">One of three columns</div>
              <div class="col-3">One of three columns</div>
            </div>
          </div> */}
          {/* <div className="flexContainer">
            <div className="radar">
              <RadarChart data={this.state.data} />
            </div>
            <div className="legend">nbhbhjbh</div> */}
          <BarChart />
          <BarChartSeatsPerClass />
          {/* </div> */}
        </React.Fragment>
      );
    }
  }
}

export default VisualizationSite;
