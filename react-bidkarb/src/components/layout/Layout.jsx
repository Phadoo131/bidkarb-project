import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
// import BidDetails from "./BidDetails";
import ReceiveDetails from "./ReceiveForm";
import ItemDesc from "./ItemDesc";
import "../../custom.css";

export default function Layout({ image, detail, desc }) {
  return (
    <>
      <Container className="d-flex flex-column gap-2">
        <Row
          xs={1}
          sm={1}
          lg={2}
          className="align-items-center gx-0 gap-2 justify-content-between"
        >
          <Col lg={4} className="p-0 flex-grow-1">
            <div className="containercolor">{image}</div>
          </Col>
          <Col lg={4} className="containercolor p-0 flex-grow-1">
            <div>{detail}</div>
          </Col>
        </Row>
        <div className="containercolor">{desc}</div>
      </Container>
    </>
  );
}
