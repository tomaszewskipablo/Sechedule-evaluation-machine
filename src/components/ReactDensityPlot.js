import CalendarHeatmap from 'reactjs-calendar-heatmap'
import React, { Component } from "react";

const data = [{
    "date": "2016-01-01",
    "total": 17164,
    "details": [{
      "name": "Project 1",
      "date": "2016-01-01 12:30:45",
      "value": 9192
    }, {
      "name": "Project 2",
      "date": "2016-01-01 13:37:00",
      "value": 6753
    },
    {
      "name": "Project N",
      "date": "2016-01-01 17:52:41",
      "value": 1219
    }]
  }];


class ReactDensityPlot extends React.Component {

    render() {
        return (
            <CalendarHeatmap
                data={data}>
            </CalendarHeatmap>
        );
    }   
}

export default ReactDensityPlot;