import React, { Component } from "react";
import ReactDensityPlot from "./ReactDensityPlot";
import GithubDensityPlot from "./Github-like-density-plot";
import { Checkbox, Button } from "antd";
import moment from 'moment';

const names = ["adam", "pawel", "gergly", "person", "abc"];


class DensitySite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleNames: names,
      isLoaded: false,
      scheduleNamescheckedValues: [],
    };
  }

  componentDidMount() {
    fetch(
      "http://ec2-3-70-254-32.eu-central-1.compute.amazonaws.com:5000/s3_files"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          scheduleNames: json
            .replace("[", "")
            .replace("]", "")
            .replace(/\\"/g, "")
            .replace(/"/g, "")
            .split(","),
        });
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
    this.provideDensityPlotData();
    console.log("checked = ", this.state.scheduleNamescheckedValues);
  };

  updateCheckedValueList = (checkedValuesList) => {
    this.setState({
      scheduleNamescheckedValues: checkedValuesList,
    });
  };

  provideDensityPlotData = () => {
    fetch(
      "http://ec2-3-70-254-32.eu-central-1.compute.amazonaws.com:5000/barplotdata?schedule_filename=schedule.csv&classroom_filename=classrooms.csv"
    )
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

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
    }
    else {

      let countOfHoursToDisplay = 15;

      let momentNow = moment('1971-jan-1 23:00');
      let startDate = moment(momentNow).add(-countOfHoursToDisplay, 'hours');

      // dummy data
      let githubLikeData = Array.from(new Array(countOfHoursToDisplay)).map((_, index) => {
        return {
          date: moment(startDate).add(index, 'hours'),
          value: Math.floor(Math.random() * 100)
        };
      });


      const reactCalendarData = [{
        "date": "2016-01-01",
        "total": 41500,
        "details": [{
          "name": "Mon",
          "date": "2016-01-01 12:15",
          "value": 10000
        },
        {
          "name": "Tue",
          "date": "2016-01-01 9:30",
          "value": 8000
        },
        {
          "name": "Wed",
          "date": "2016-01-01 10:45",
          "value": 9000
        },
        {
          "name": "Thu",
          "date": "2016-01-01 18:00",
          "value": 7000
        },
        {
          "name": "Fri",
          "date": "2016-01-01 19:15",
          "value": 7500
        }]
      }];

     
      return (
        <React.Fragment>
          <div>
            <Checkbox.Group
              options={scheduleNames}
              onChange={this.updateCheckedValueList}
            />
            <Button onClick={this.getVisualizeData}>Confirm</Button>
          </div>
          <ReactDensityPlot data={reactCalendarData} />
          <GithubDensityPlot data={githubLikeData} dateRange={[startDate, momentNow]} />
        </React.Fragment>
      );
    }
  }
}

export default DensitySite;
