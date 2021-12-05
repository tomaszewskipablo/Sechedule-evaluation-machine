import React, { Component } from "react";
import { Menu } from "antd";
import {
  DotChartOutlined,
  BoxPlotFilled,
  FileDoneOutlined,
  GithubOutlined,
} from "@ant-design/icons";

class NavBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="logo">
          <a
            href="https://github.com/tomaszewskipablo/Sechedule-evaluation-machine"
            target="_blank"
          >
            <GithubOutlined
              style={{ fontSize: "29px", color: "white", marginLeft: "5px" }}
            />
          </a>
        </div>
        <Menu theme="dark" mode="horizontal" style={{ maxWidth: "800px" }}>
          <Menu.Item key={1}>
            {<a href="/"> File</a>}
            <FileDoneOutlined style={{ margin: "5px" }} />
          </Menu.Item>
          <Menu.Item key={2}>
            {<a href="/visualization"> Visualization </a>}
            <DotChartOutlined style={{ margin: "5px" }} />
          </Menu.Item>
          <Menu.Item key={3}>
            {<a href="/densitymap"> Desnsity map </a>}
            <DotChartOutlined style={{ margin: "5px" }} />
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}

export default NavBar;
