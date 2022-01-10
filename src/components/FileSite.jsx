import React, { Component } from "react";
import UploadFile from "./UploadFile";
import { Row, Col } from "antd";
import ParCorGraph from "./ParCorGraph";

class FileSite extends React.Component {
  render() {
    return (
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <UploadFile />
        </Col>
        <Col span={12}></Col>
      </Row>
    );
  }
}

export default FileSite;
