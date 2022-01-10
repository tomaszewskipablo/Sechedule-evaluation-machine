import CalendarHeatmap from 'reactjs-calendar-heatmap'
import React, { Component } from "react";




class ReactDensityPlot extends React.Component {

  constructor(props) {
    super(props);

  }

  color = '#45ff00';
  overview = 'day';

  render() {
      return (
          <CalendarHeatmap
              data={this.props.data}
              color={this.color}
              overview={this.overview}>
          </CalendarHeatmap>
      );
  }   
}

export default ReactDensityPlot;