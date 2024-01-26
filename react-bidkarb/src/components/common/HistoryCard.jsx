import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import {
  cancelAuction,
  historyRequestCancelled,
  historyRequestCompleted,
  historyRequestOngoing,
  historyRequestSales,
} from "../../API/Auction";
import { Col, Row, Button } from "react-bootstrap";

async function historyRequestCancelledLoader({ user }) {
  try {
    const response = await historyRequestCancelled(user.id);
    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

async function historyRequestCompletedLoader({ user }) {
  try {
    const response = await historyRequestCompleted(user.id);
    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

async function historyRequestOngoingLoader({ user }) {
  try {
    const response = await historyRequestOngoing(user.id);
    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

async function historyRequestSalesLoader({ user }) {
  try {
    const response = await historyRequestSales(user.id);
    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export default function HistoryCard({ selectedTab, user }) {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchData(selectedTab);
  }, [selectedTab, user]);

  const fetchData = async (selectedTab) => {
    try {
      let res;
      switch (selectedTab) {
        case "1":
          res = await historyRequestSalesLoader({ user });
          break;

        case "2":
          res = await historyRequestOngoingLoader({ user });
          break;

        case "3":
          res = await historyRequestCompletedLoader({ user });
          break;

        case "4":
          res = await historyRequestCancelledLoader({ user });
          break;

        default:
          break;
      }

      if (res.response) {
        console.log(res);
        console.log(res.response);
        console.log(res.response.data);
        setAuctions([]);

        let aucts = res.response.data;
        aucts.forEach((auct) => {
          setAuctions((prevData) => [...prevData, { auct }]);
          console.log(auct);
        });
        console.log(auctions);
        // setAuctions((prevData) => [...prevData, {auction: res.response.data}])
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleOnClick = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const response = await cancelAuction(auction.auct);
      
  //   } catch (error) {
  //     console.error(error);
  //     return { error };
  //   }
  // }

  return (
    <Row sm={1} lg={3} className="justify-content-center">
      {auctions.map((auction) => {
          const handleOnClick = async (e) => {
            e.preventDefault();
            
            try {
              const response = await cancelAuction(auction.auct);
              
            } catch (error) {
              console.error(error);
              return { error };
            }
          }
        const detailsUrl = `auction/${auction.auct.id}`;
        const disputeUrl = `dispute/${auction.auct.id}`;
        const editAuctionUrl = `auctions/edit/${auction.auct.id}`
        console.log(auction.auct);
        return (
          <Col>
            <Card key={auction.auct.id} style={{ width: "18rem" }}>
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
                <ListGroup.Item>
                  Status: {auction.auct.status}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                {selectedTab === "3" ? 
                <>
                <Card.Link href={disputeUrl}>Dispute!</Card.Link> 
                <Card.Link href={detailsUrl}>Auction Details</Card.Link> 
                </>
                : <Card.Link href={detailsUrl}>Auction Details</Card.Link>} 
                {selectedTab === "1" && auction.auct.status === "ON_GOING" ? <><br></br> <Card.Link href={editAuctionUrl}>Edit Auction</Card.Link></> : null}
                {selectedTab === "1" && auction.auct.status === "OPEN_SOON" ? <p onClick={(e) => handleOnClick(e)}>Cancel</p> : null} 
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
