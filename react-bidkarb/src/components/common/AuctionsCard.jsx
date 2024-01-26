import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getAllAuction } from "../../API/Auction";
import { useLoaderData } from "react-router-dom";
import { searchAuctionByName } from "../../API/Auction";

async function auctionsLoader() {
  try {
    const response = await getAllAuction();
    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export default function AuctionsCard() {
  const [auctions, setAuctions] = useState([]);

  // const {loadResponse} = useLoaderData();

  const fetchData = async () => {
    try {
      let res = await auctionsLoader();
      if (res.response) {
        let aucts = res.response.data;
        setAuctions([]);
        aucts.forEach((auct) => {
          setAuctions((prevData) => [...prevData, { auct }]);
          console.log(auct);
        });
        console.log(auctions);
        console.log(loadResponse)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Row sm={1} lg={3} className="justify-content-center">
      {(auctions.map((auction) => {
        const detailsUrl = `auction/${auction.auct.id}`;
        console.log(auction.auct);
        return (
          <Col key={auction.auct.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={auction.auct.imageURL} />
              <Card.Body>
                <Card.Title>{auction.auct.productName}</Card.Title>
                <Card.Text>{auction.auct.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>End At: {auction.auct.endAt}</ListGroup.Item>
                <ListGroup.Item>
                  Current Bid Price: {auction.auct.latestBid}
                </ListGroup.Item>
                <ListGroup.Item>
                  Seller: {auction.auct.seller.firstName}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href={detailsUrl}>Auction Details</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        );
      }))}
    </Row>
  );
}
