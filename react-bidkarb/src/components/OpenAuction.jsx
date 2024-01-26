import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "./Form";
import AuctionForm from "./layout/AuctionForm";

function OpenAuction(seller) {
  const [auction, setAuction] = useState({
    id: "",
    productName: "",
    productCategory: "",
    quality: "",
    openPrice: "",
    minBid: "",
    buyNow: "",
    startAt: "",
    endAt: "",
    description: "",
    bankName: "",
    bankNumber: "",
  });

  let sellerId = seller.id;

  useEffect(() => {
    const fetctAuction = async() => {
      try {
        const response = await axios.post(`http://localhost:8080/auctions/new/${sellerId}`);
        setAuction(response.data);
      } catch (error) {
        console.error("Error fetching auction: ", error.message)
      }
    }
    fetctAuction();
  }, [auction])

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
      <h2>Open Auction</h2>
      <AuctionForm value={auction} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

export default OpenAuction;
