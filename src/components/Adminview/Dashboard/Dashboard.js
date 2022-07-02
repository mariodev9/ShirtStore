import React from "react";
import { Container, Row } from "react-bootstrap";
import "../../../assets/css/Adminview.scss";
import { HeaderTypes } from "./HeaderTypes";
export const Dashboard = () => {
  return (
    <>
      <Container>
        <Row>
          <HeaderTypes title={"shirts"} icon={""} number={245} />
          <HeaderTypes title={"news"} icon={""} number={84} />
          <HeaderTypes title={"users"} icon={""} number={117} />
        </Row>
      </Container>
    </>
  );
};
