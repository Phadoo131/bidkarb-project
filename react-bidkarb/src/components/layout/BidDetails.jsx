import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CustomButton from "../common/CustomButton";
import { buyNow } from "../../API/Bidding";
import "../../custom.css"
import OrderSummary from "./OrderSummary";
import OrderSummaryPB from "./OrderSumaryPB";


export default function BidDetails({auction, bids, handlePlaceBid, currentUser}) {

  const [bid, setBid] = useState({
    amount: 0,
  });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showOrderSummaryPB, setShowOrderSummaryPB] = useState(false);

  const latestBuyer = auction.buyer;


  const handleBidAmountChange = (e) =>{
    setBid((prevBid) => ({
      ...prevBid,
      amount: e.target.value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await handlePlaceBid({request: user.id, request2: auction.id, request3: bid})
  //     console.log('Bid Amount submitted:', response);

  //   } catch(error){
  //     console.error(error);
  //   }
  // };

  const handleOrderSummaryPlaceBid = (e) =>{
    e.preventDefault();

    setShowOrderSummaryPB(true);
  }

  const closeOrderSummaryPlaceBid = () => {
    setShowOrderSummaryPB(false);
  };



  const handleOrderSummaryBuyNow = (e) =>{
    e.preventDefault();

    setShowOrderSummary(true);
  }

  const closeOrderSummary = () => {
    setShowOrderSummary(false);
  };

  return (
    <Container className="p-4 pb-5">
      <h2 className="mb-3">Bidding status</h2>
      <p>
        <em>{bids ? bids.length + 1 : 0}</em>bids
      </p>
      <div className="d-flex justify-content-between">
        <p>
          End times: <em>{Date(auction.endAt)}</em>
        </p>
      </div>
      <div className="d-flex justify-content-between">
        <p>
          Min-bid: <em>{auction.minBid}</em>
        </p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Current bid: <em>{auction.latestBid}</em></p>
        <p>
          by:
          <em>
            <strong>{latestBuyer === null ? "No buyer yet!" : latestBuyer.user.username}</strong>
          </em>
        </p>
      </div>
      <p className="mb-3">
        <strong>PRICE฿</strong>
      </p>
      <Form onSubmit={handleOrderSummaryPlaceBid}>
      <div className="d-flex align-items-center justify-content-end mb-3">
        <Form.Label className="text-nowrap me-2">Your Bid:</Form.Label>
        <div className="me-2">
          <Form.Control size="sm" type="number" step="0.01" placeholder="฿฿฿" value={bid.amount}
            onChange={handleBidAmountChange} />
        </div>
        <CustomButton size="sm">Confirm</CustomButton>
      </div>
      </Form>
      {/* <div className="d-flex justify-content-end align-items-center">
        <p className="m-0 me-2">
          or Buy Now!: <strong>{auction.buyNow}</strong>
        </p>
        <CustomButton size="sm" onClick={(e) => handleBuyNow(e)}>Buy Now</CustomButton>
      </div> */}
      {/* <Form onSubmit={handleBuyNow}>
      <div className="d-flex align-items-center justify-content-end mb-3"> */}
          {/* <OrderSummary common={auction.buyNow}/> */}
          {/* <Button size="sm" className="bg-indigo">BuyNow</Button>
      </div> */}
            {/* </Form>
       */}
        <div className="d-flex align-items-center justify-content-end mb-3">
          <Button size="sm" className="bg-indigo" onClick={(e) => handleOrderSummaryBuyNow(e)}>
            Buy Now
          </Button>
        </div>

      {/* OrderSummary Modal */}
      <Modal show={showOrderSummary} onHide={closeOrderSummary}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderSummary
            auction={auction}
            bids={bids}
            user={currentUser}
            child={"BuyNow"}
            onClose={closeOrderSummary}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showOrderSummaryPB} onHide={closeOrderSummaryPlaceBid}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderSummaryPB
            auction={auction}
            bid={bid}
            user={currentUser}
            child={"Confirm your Bid!"}
            onClose={closeOrderSummaryPlaceBid}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
