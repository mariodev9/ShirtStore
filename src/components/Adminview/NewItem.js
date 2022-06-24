import React from "react";
import { Col } from "react-bootstrap";

export const NewItem = ({ title }) => {
  return (
    <Col xs={4}>
      <h3>{title}</h3>
    </Col>
  );
};
