import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Profile from "../common/profile";

export default function ItemDesc({buyer, auction}) {
  return (
    <Container className="p-5">
      <Row
        xs={1}
        sm={1}
        lg={2}
        className="justify-content-between flex-row-reverse"
      >
        <Col className="d-flex justify-content-end">
          {/* <div className="d-flex "> */}
          <Profile />
          <div>
            <strong>{buyer.user}</strong>
            <p>
              Rating: <em>{buyer.rate}</em>
            </p>
          </div>
          {/* </div> */}
        </Col>
        <Col>
          <div>
            <p>
              Item ID: <em>{auction.id}</em>
            </p>
            <p>
              Category: <em>{auction.productCategory.categoryName}</em>
            </p>
            <p>
              Item name: <em>{auction.productName}</em>
            </p>
            <p>
              Quality: <em>{auction.quality}</em>
            </p>
          </div>
        </Col>
      </Row>
      <p>
        <strong>Description</strong>
      </p>
      <p><em>{auction.description}</em></p>
    </Container>
  );
}

{
  /* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Item Details</Form.Label>
          <Form.Control as="textarea" rows={16} />
        </Form.Group> */
}
