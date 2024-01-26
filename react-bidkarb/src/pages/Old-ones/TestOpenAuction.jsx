import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { createAuction } from "../../API/Auction";
import { getCurrentUser } from "../../util/APIUtils";

export async function loader({ params }) {

  const user = await getCurrentUser(params.id);
  if (!user) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { user };
}


function OpenAuction() {

  const navigate = useNavigate();
  const {user} = useLoaderData();

  useEffect(()=>{
    if (!user){
      console.log("Cannot find user")
    } else{
      navigate(`/openAuction/${user.id}`);
    }
  },[user]);
 
  

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuction((auction) => ({ ...auction, [name]: value }));
  };

  const createAuctionAPI = () =>{
    let response = createAuction(auction, user.id);
    console.log(user);
    console.log(user.id);
    console.log(auction);
    console.log(response);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createAuctionAPI(user.id, JSON.stringify(auction))
  };

  return (
    <div>
      <h2>Open Auction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            name="productName"
            value={auction.productName}
            onChange={handleChange}
            placeholder="item name"
          ></input>
        </label>
        <label>
          Category:
          <input
            type="text"
            name="productCategory"
            value={auction.productCategory}
            onChange={handleChange}
            placeholder="category name"
          ></input>
        </label>
        <label>
          Quality:
          <select
            name="quality"
            value={auction.quality}
            onChange={handleChange}
          >
            <option value="new">new</option>
            <option value="second hand">second hand</option>
          </select>
        </label>
        <label>
          Start bid:
          <input
            type="text"
            name="startBid"
            value={auction.startBid}
            onChange={handleChange}
            placeholder="start bid price"
          ></input>
        </label>
        <label>
          Minimum bid:
          <input
            type="text"
            name="minBid"
            value={auction.minBid}
            onChange={handleChange}
            placeholder="minimun bid price"
          ></input>
        </label>
        <label>
          Buy now:
          <input
            type="text"
            name="buyNow"
            value={auction.buyNow}
            onChange={handleChange}
            placeholder="buy now price"
          ></input>
        </label>
        <label>
          Start Time:
          <input
            type="datetime-local"
            name="startTime"
            value={auction.startTime}
            onChange={handleChange}
            placeholder="start time"
          ></input>
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            name="endTime"
            value={auction.endTime}
            onChange={handleChange}
            placeholder="end time"
          ></input>
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={auction.description}
            onChange={handleChange}
            placeholder="description"
          ></input>
        </label>
        <label>
          Bank name
          <input
            type="text"
            name="bankName"
            value={auction.bankName}
            onChange={handleChange}
            placeholder="bank name"
          ></input>
        </label>
        <label>
          Bank account
          <input
            type="text"
            name="bankAccount"
            value={auction.bankAccount}
            onChange={handleChange}
            placeholder="Bank account id"
          ></input>
        </label>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}

export default OpenAuction;
