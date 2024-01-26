import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustomButton from "../common/CustomButton";
import Profile from "../common/profile";

export default function RatingDesc() {
  return (
    <Container className="py-4 px-5">
      <h2 className="mb-3">How many star would you give to them?</h2>
      <div className="d-flex">
        <Profile />
        <div>
          <strong>Username</strong>
          <p>
            Rating: <em>point</em>
          </p>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          <strong>Write your comment</strong>
        </Form.Label>
        <Form.Control as="textarea" rows={16} />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <CustomButton size="lg">Received Confirm</CustomButton>
      </div>
    </Container>
  );
}

{
  /* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Item Details</Form.Label>
          <Form.Control as="textarea" rows={16} />
        </Form.Group> */
}
