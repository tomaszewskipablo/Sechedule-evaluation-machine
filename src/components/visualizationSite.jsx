import React, { Component } from "react";
import RadarChart from "./RadarChart";
import Doughtnut from "./Doughtnut";
import BarChart from "./BarChart";
import BarChartSeatsPerClass from "./BarChartSeatsPerClass";
import { Checkbox, Button } from "antd";

class VisualizationSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleNames: [],
      isLoaded: false,
      scheduleNamescheckedValues: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          scheduleNames: ["adam", "pawel", "gergly", "kac"],
          //scheduleNames: json,
        });
        console.log(json);
      });
  }

  getVisualizeData = () => {
    if (this.state.scheduleNamescheckedValues.length > 0) {
      this.setState({
        isLoaded: true,
      });
    } else {
      this.setState({
        isLoaded: false,
      });
    }
    console.log("checked = ", this.state.scheduleNamescheckedValues);
  };

  updateCheckedValueList = (checkedValuesList) => {
    this.setState({
      scheduleNamescheckedValues: checkedValuesList,
    });
  };

  render() {
    var { isLoaded, scheduleNames, checkedValues } = this.state;

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
                <RadarChart />
              </li>
              <li>
                <Doughtnut />
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
