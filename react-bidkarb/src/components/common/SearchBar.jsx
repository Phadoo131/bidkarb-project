import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CustomButton from "./CustomButton";
import { useState } from "react";
import { searchAuctionByName } from "../../API/Auction";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

  const [auctionName, setAuctionName] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>{
    e.preventDefault()

    setAuctionName((prev) => e.target.value);
  };

  const handleSearch = async (e) =>{
    e.preventDefault()

    navigate(`/auctions/${auctionName}`)

  }

  return (
    <Form className="d-flex w-50" onSubmit={handleSearch}>
      <Form.Control
        type="search"
        placeholder="Search ongoing auctions only...."
        className="me-2"
        aria-label="Search"
        value={auctionName}
        onChange={(e) => handleChange(e)}
      />
      <CustomButton>search</CustomButton>
    </Form>
  );
}
