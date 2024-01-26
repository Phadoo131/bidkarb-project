import React, { useState } from "react";
import { viewAuctionDetails } from "../../API/Auction";
import { confirmShipping } from "../../API/Shipping";
import { useNavigate, useLoaderData } from "react-router-dom";
import "../../custom.css";
 
export async function loader({ params }) {
  //in Auction => Set navigate("/shipping/${auction.id}")
  const auction = await viewAuctionDetails(params.auctionId);
  if (!auction) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { auction };
}
 
export async function action({ request }) {
  let shipping = await request;
  let response = confirmShipping(shipping);

  console.log(shipping);
  console.log(response);
  return response;
}
 
const Shipping = () => {
  const { auction } = useLoaderData();
  const navigate = useNavigate();

  // const [id, setId] = useState(1);
  const [shipping, setShipping] = useState({
    // id: id,
    trackingNumber: "",
    shippingCompany: "",
    otherShippingCompany: "",
    auction: auction.data,
  });
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShipping((prevShipping) => ({ ...prevShipping, [name]: value }));
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    try {
      await action({ request: shipping });
      alert("Your shipment is already record to our system and notified to buyer. Please 'Enter' to homepage.")
      navigate("/")

      // setId(id + 1);
    } catch (error) {
      alert("Shipping confirmation Error! please try again.")
      console.error(error);
    }
  };
 
  return (
    <>
      <h2 className="my-5">Shipment</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center gap-3 px-3 py-5 containercolor"
      >
        <div className="d-flex flex-column align-items-start w-75">
          <label className="form-label">Tracking Number</label>
          <input
            type="text"
            id="trackingNumber"
            name="trackingNumber"
            value={shipping.trackingNumber}
            onChange={handleInputChange}
            placeholder="Tracking number..."
            className="form-control"
          />
        </div>
        <div className="d-flex flex-column align-items-start w-75">
          <label className="form-label">Shipment company</label>
          {/* <div className="form-floating w-75"> */}
          <select
            name="shippingCompany"
            id="shipCom"
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Thaipost">Thaipost</option>
            <option value="Kerry">Kerry</option>
            <option value="Flash">Flash</option>
            <option value="Best">Best</option>
            <option value="Ninja van">Ninja van</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* </div> */}
        <div className="d-flex flex-column align-items-start w-75">
          <label className="form-label">Other shipment</label>
          <input
            type="text"
            id="otherShippingCompany"
            name="otherShippingCompany"
            value={shipping.otherShippingCompany}
            onChange={handleInputChange}
            placeholder="If you sent by other company please input shipping company name or remark message that you want to customer"
            className="form-control"
          />
        </div>
        <button
          className="btn bg-indigo btn-primary flex-grow"
          type="submit"
          style={{ color: "white" }}
        >
          Comfirm Shipment
        </button>
      </form>
    </>
  );
};
 
export default Shipping;
 