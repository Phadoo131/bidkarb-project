import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function SearchBar() {
  return (
    <InputGroup>
      <Form.Control
        placeholder="Find something..."
        aria-label="Find something..."
        aria-describedby="basic-addon2"
      />
      <Button variant="info" id="button-addon2">
        Search
      </Button>
    </InputGroup>
  );
}
