import React from "react";
import Plot from "react-plotly.js";

class ParCorGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  componentDidUpdate() {
    console.log("NONONOONON: ", this.props.data);
  }

  render() {
    return <Plot data={[this.props.data]}></Plot>;
  }
}

export default ParCorGraph;
