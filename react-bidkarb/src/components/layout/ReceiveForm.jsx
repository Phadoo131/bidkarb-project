import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { viewAuctionDetails } from "../../API/Auction";
import { getCurrentUser } from "../../util/APIUtils";
import { getShipping, confirmReceived } from "../../API/Shipping"
import { getBkUserInfo } from "../../API/BidKarbUser";
import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { FaStar } from 'react-icons/fa'
import Profile from "../common/profile";
import CustomButton from "../common/CustomButton";
import ItemImage from "../common/ItemImage";
import "../../custom.css"
  

export async function loader({params}) {
  const auction = await viewAuctionDetails(params.auctionId);
  const ship = await getShipping(params.auctionId);
  const user = await getCurrentUser();
  const bkUser = await getBkUserInfo(user.id);
 
  console.log("auction: ",auction)
  console.log("ship: ",ship)
  console.log("user: ",user)
  console.log("BkUser: ",bkUser.data)
 
  if (!user || !auction || !ship ||!bkUser) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { auction, ship, user, bkUser };
}
 
export async function action({request1, request2, request3}) {
  console.log("Log request: ",request1, request2, request3);
 
  let auction = await request1;
  let rating = await request2;
  let shipment = await request3;
 
  let response = await confirmReceived(auction.id, parseFloat(rating), shipment);
 
  console.log("aucton: ",auction.id,"point: ",rating,"comment: ",shipment)
  return response;
}

export default function ReceiveForm() {
  const navigate = useNavigate()
  const { auction, ship, user, bkUser } = useLoaderData()
  const [shipment, setShipment] = useState({
    comment: "",
  });

  const [hover, setHover] = useState();
  const [rating, setRating] = useState(0.0);
 
  const handleInputChange = (e) => {
       
    setShipment((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    setRating((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
};
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    console.log(shipment);
    console.log(rating);
 
    try {
      await action({ request1: auction.data, request2: rating, request3: shipment });
      alert("Your information has been recorded in Bidkarb's system. Please click 'Enter' to go back to the homepage.")
      navigate('/');
    } catch (error) {
      alert("Received confirmation Error! please try again.")
      console.error(error);
    }
  };


  return (
    <>
    
    <Container className="p-5 containercolor root-withoutTextCenter">
      <div className="row  justify-content-between align-items-center ">
          <div className = "col-5">
         <ItemImage src={auction.data.imageURL} w={280} h={150} />
         </div>
         <div className = "col-5">
        <p>
          Item name: <em>{auction.data.productName}</em>
        </p>
        <p>
          Auction Id: <em>{auction.data.id}</em>
        </p>
      <p>
        Category: <em>{auction.data.productCategory.categoryName}</em>
      </p>
      <p>
        Shipping company <em>{ship.data.shippingCompany}</em>
      </p>
      <p className="mb-0">
        Tracking ID: <em>{ship.data.trackingNumber}</em>
      </p>
      </div>
      </div>
    </Container> 
   
    <Container className="py-4 px-5 containercolor root-withoutTextCenter">
    <Form onSubmit={(e) => handleSubmit(e)}>
      <h2 className="mb-3">How many star would you give to them?</h2>
      <div>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            // console.log("currentRating: ",currentRating)
            return(
              <label>
                <input className="d-none" type="radio" name="rating" value={currentRating} onChange={() => setRating(currentRating)}/>
                <FaStar 
                size = {20} 
                color={currentRating <= (hover || rating) ? "#ffc107" : "#999"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                 />
              </label>
            )
          })}
        </div>
        <br/>
      <div className="d-flex">
        <Profile />
        <div>
          <strong>{auction.data.seller.user.username}</strong>
          <p>
            Rating: <em>{auction.data.seller.rate}</em>
          </p>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          <strong>Write your comment</strong>
        </Form.Label>
        <Form.Control type="text"
            id="comment"
            name="comment"
            value={shipment.comment}
            onChange={handleInputChange}
            placeholder="Enter message to review seller here"/>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <CustomButton size="lg">Received Confirm</CustomButton>
      </div>
      </Form>
    </Container> 
    </>

  //   <Container className="containercolor p-5 px-0 d-flex flex-column gap-4">
  //     <Form onSubmit={(e) => handleSubmit(e)}>

  //     <div>
  //         item: {auction.data.productName}<br/>
  //         item ID: {auction.data.id}<br/>
  //         Category: {auction.data.productCategory.categoryName}<br/>
  //         Shipping company: {ship.data.shippingCompany}<br/>
  //         Tracking number: {ship.data.trackingNumber}<br/>
  //       </div>
  //       <div>
  //         { user.name}<br/>
  //         { bkUser.data.rate } stars rating
  //       </div>

  //       <div class="star">
  //         {[...Array(5)].map((star, index) => {
  //           const currentRating = index + 1;
  //           console.log("currentRating: ",currentRating)
  //           console.log("rating: ",rating)
  //           return(
  //             <label>
  //               <input type="radio" name="rating" value={currentRating} onChange={() => setRating(currentRating)}/>
  //               <FaStar 
  //               className="star" 
  //               size = {20} 
  //               color={currentRating <= (hover || rating) ? "#ffc107" : "#999"}
  //               onMouseEnter={() => setHover(currentRating)}
  //               onMouseLeave={() => setHover(null)}
  //                />
  //             </label>
  //           )
  //         })}
  //       </div>
        
  //       <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
  //         <Form.Label className="mb-0 text-nowrap">Message to Review Seller</Form.Label>
  //         <Form.Control
  //           type="text"
  //           placeholder="Enter message to review seller here"
  //           value={shipment.comment}
  //           onChange={(e) => handleInputChange("comment", e.target.value)}
  //         />
  //       </Form.Group>
  //       <div className="align-self-end px-5">
  //         <Button type="submit" size="lg" className="bg-indigo">
  //           Confirm Received
  //         </Button>
  //       </div>
  //     </Form>
  // </Container>
  
  );
}