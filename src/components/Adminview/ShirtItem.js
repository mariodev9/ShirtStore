import React from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../common/Button";
import "../../assets/css/ShirtItem.css";

export const ShirtItem = ({ team, season, type }) => {
  return (
    <Row className="item-container">
      <Col xs={5} className="hola">
        <p>{team}</p>
      </Col>
      <Col>
        <p>{season}</p>
      </Col>
      <Col>
        <p>{type}</p>
      </Col>
      <Col>
        <Button msg={"Edit"} color={"#47B5FF"} shadow={"#347daf"} />
      </Col>
      <Col>
        <Button msg={"X"} color={"#f0003c"} shadow={"#650626"} />
      </Col>
    </Row>
  );
};
