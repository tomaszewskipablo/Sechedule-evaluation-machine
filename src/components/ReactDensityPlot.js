import CalendarHeatmap from 'reactjs-calendar-heatmap'
import React, { Component } from "react";

const data = [{
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


class ReactDensityPlot extends React.Component {

    render() {
      let color = '#45ff00';
      let overview = 'day';
        return (
            <CalendarHeatmap
                data={data}
                color={color}
                overview={overview}>
            </CalendarHeatmap>
        );
    }   
}

export default ReactDensityPlot;