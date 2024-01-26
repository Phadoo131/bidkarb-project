import Nav from "react-bootstrap/Nav";
import { Tab, Row, Col } from "react-bootstrap";
import "../../custom.css";

export default function HistoryTab({handleSelect, selectedTab}) {
  return (
        <Tab.Container activeKey={selectedTab} onSelect={handleSelect}>
          <Row>
            <Col sm={12}>
              <Nav variant="pills" className="gap-2 justify-content-center mb-4">
                <Nav.Item>
                  <Nav.Link className="text-color" eventKey="1">
                    Your Sales
                  </Nav.Link>
                </Nav.Item>
     
                <Nav.Item>
                  <Nav.Link className="text-color" eventKey="2">
                    Ongoing
                  </Nav.Link>
                </Nav.Item>
     
                <Nav.Item>
                  <Nav.Link className="text-color" eventKey="3">
                    Completed
                  </Nav.Link>
                </Nav.Item>
     
                <Nav.Item>
                  <Nav.Link className="text-color" eventKey="4">
                    Cancelled
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      );
}
