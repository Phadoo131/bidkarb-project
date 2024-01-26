import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import { useEffect } from "react";
import axios from "axios";

function EditAuction({auct}) {
  const [auction, setAuction] = useState(auct);

  useEffect(() => {
    const fetctEditAuction = async() => {
      try {
        const response = await axios.put(`http://localhost:8080/auctions/edit/${auct.id}`);
        setAuction(response.data);
      } catch (error) {
        console.error("Error fetching auction: ", error.message)
      }
    }
    fetctEditAuction();
  }, [auction]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuction((auction) => ({ ...auction, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(auction);
  };

  return (
    <div>
      <h2>Edit Auction</h2>
      <Form value={auction} onChange={handleChange} onSubmit={handleSubmit}/>
    </div>
  );
}

export default EditAuction;
