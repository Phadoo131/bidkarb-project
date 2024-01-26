import { Container, Row, Col } from "react-bootstrap";

export default function ReceiveDetails() {
  return (
    <Container className="p-5">
      <h2 className="mb-3">Receive Details</h2>
      <div className="d-flex justify-content-between">
        <p className="mr-4">
          Item name: <em>(name)</em>
        </p>
        <p className="text-end">
          Auction Id: <em>(num)</em>
        </p>
      </div>
      <p>
        Category: <em>(Item type)</em>
      </p>
      <p>
        Shipping company <em>(company name)</em>
      </p>
      <p className="mb-0">
        Tracking ID: <em>(tracking num)</em>
      </p>
    </Container>
  );
}
