import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import "./components/Github-like-css.css";
import FileSite from "./components/FileSite";
import DensitySite from "./components/densitySite";
import NavBar from "./components/NavBar";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VisualizationSite from "./components/visualizationSite";
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <NavBar />
          </Header>
          <Content>
            <div className="site-layout-content">
              <Switch>
                <Route exact path="/">
                  <FileSite />
                </Route>
                <Route path="/visualization">
                  <VisualizationSite />
                </Route>
                <Route path="/densitymap">
                  <DensitySite />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer className="footer" style={{ textAlign: "center" }}>
            Schedule Evaluation Visualization Tool ©2021
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
