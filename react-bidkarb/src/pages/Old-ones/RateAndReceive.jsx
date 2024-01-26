import React, { useState } from "react";
import {useLoaderData, useNavigate } from 'react-router-dom';
import { getCurrentUser } from "../../util/APIUtils";
import { viewAuctionDetails } from '../../API/Auction';
import { confirmReceived } from "../../API/Shipping";
import { getShipping } from "../../API/Shipping";
import { getBkUserInfo } from "../../API/BidKarbUser";

export async function loader({ params}) {
      
  console.log(params)
  const auction = await viewAuctionDetails(params.auctionId);
  const user = await getCurrentUser();
  const ship = await getShipping(params.auctId);
  const bkUser = await getBkUserInfo(params.id)
  
  if (!user || !auction || !ship || bkUser) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { auction, user, ship };
}

export async function action({request}) {
  console.log("Log request: ",request);
  let shipment = {request};
  let response = confirmReceived(request.auctionId.id, request.shipping);

  console.log(shipment)
  console.log(response)
  return response; 
}

export default function RateAndReceive() {
  const { auction, ship, bkUser } = useLoaderData()
  const [shipment, setShipping] = useState({
    comment: shipment.comment,
    rating: "",
  });

  const handleInputChange = (e) => {
        
    setDispute((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
};

const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(event);

    try {
      await action({ request: shipment });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
};
  
  return (
    <div>
      <h2>Shipment</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p>item: {auction.data.productName} </p>
          <p>item ID: {auction.data.id} </p>
          <p>Category: {auction.data.productCategory.categoryName}</p>
          <p>Shipping company: {ship.data.shippingCompany} </p>
          <p>Tracking number: {ship.data.trackingNumber} </p>
        </div>
        <div>
          <p>{ user.data.username }</p> 
          <p>{ bkUser.data.rate }</p> 
        </div>
        <div>
          <input
            type="text"
            id="comment"
            name="comment"
            value={shipment.comment}
            onChange={handleInputChange}
            placeholder="Enter message to review seller here"
          />
        </div>
      </form>
    </div>
  );
}
