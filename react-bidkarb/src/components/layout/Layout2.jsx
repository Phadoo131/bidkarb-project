import { Col, Container, Row } from "react-bootstrap";
import ItemImage from "../common/ItemImage";
import AuctionForm from "./AuctionForm";
import "../../custom.css";

export default function Layout2({ image, form }) {
  return (
    <>
      <Row xs={1} sm={1} lg={2} className="containercolor p-5">
        <Col>{image}</Col>
        <Col className="d-flex flex-column">{form}</Col>
      </Row>
    </>
  );
}
