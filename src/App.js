import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import RadarChart from "./components/RadarChart";
import UploadFile from "./components/UploadFile";

import {
  DotChartOutlined,
  RocketTwoTone,
  BoxPlotFilled,
  FileDoneOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { Row, Col } from "antd";
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo">
            <BoxPlotFilled
              rotate="90"
              style={{ fontSize: "29px", color: "white" }}
            />
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key={1}>
              {`File`}
              <FileDoneOutlined style={{ margin: "5px" }} />
            </Menu.Item>
            <Menu.Item key={2}>
              {`Visualization`}
              <DotChartOutlined style={{ margin: "5px" }} />
            </Menu.Item>
            <Menu.Item key={3}>{`Upload File`}</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: "64px" }}>
          <div className="site-layout-content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <RadarChart />
              </Col>
              <Col span={12}>sdasdasdas</Col>
            </Row>
          </div>
        </Content>
        <Footer className="footer" style={{ textAlign: "center" }}>
          Schedule Evaluation Visualization Tool ©2021
        </Footer>
      </Layout>
    );
  }
}

export default App;
