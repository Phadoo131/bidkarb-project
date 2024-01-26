import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getAllAuction } from "../../API/Auction";
import { useLoaderData, useNavigate } from "react-router-dom";
import { searchAuctionByName } from "../../API/Auction";


export async function loader({params}){
  const loadResponse = await searchAuctionByName(params.auctionName);

  console.log(loadResponse)
  return {loadResponse}
}

export default function AuctionsCardSearched() {
//   const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();

  const {loadResponse} = useLoaderData();

  return (
    <Row sm={1} lg={3} className="justify-content-center">
      {(loadResponse.data.map((auction) => {
        const detailsUrl = `${auction.id}`;
        console.log(auction);
        return (
          <Col key={auction.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={auction.imageURL} />
              <Card.Body>
                <Card.Title>{auction.productName}</Card.Title>
                <Card.Text>{auction.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>End At: {auction.endAt}</ListGroup.Item>
                <ListGroup.Item>
                  Current Bid Price: {auction.latestBid}
                </ListGroup.Item>
                <ListGroup.Item>
                  Seller: {auction.seller.firstName}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link onClick={() => navigate(`/auction/${auction.id}`)} >Auction Details</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        );
      }))}
    </Row>
  );
}
