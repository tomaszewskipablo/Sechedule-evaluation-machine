import React from "react";

class Rectangle extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: "inline-flex" }}>
          <span
            style={{
              width: "50px",
              height: "20px",
              margin: "5px",
              background: this.props.background,
            }}
          ></span>
          <span
            style={{
              height: "20px",
              margin: "5px",
              fontSize: "13px",
            }}
          >
            {this.props.name}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Rectangle;
