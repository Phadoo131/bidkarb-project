import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function MyCard({ data }) {

  const navigate = useNavigate();

  return (
    <div className="card-container">
    {data.map((auction, index) => (
      // Use a ternary operator to conditionally render the Card
      auction.status === 'ON_GOING' ? (
        <Card key={index} style={{ width: '18rem' }}>
          {auction.imageURL && <Card.Img variant="top" src={auction.imageURL} />}
          
          <Card.Body>
            <Card.Title>{auction.productName}</Card.Title>
            <Card.Text>
              <strong>Start Bid Price:</strong> ${auction.openPrice}<br />
              <strong>Buy Now Price:</strong> ${auction.buyNow}<br />
              <strong>End Date:</strong> {new Date(auction.endAt).toLocaleString()}<br />
              <strong>Description:</strong> {auction.description}<br />
            </Card.Text>
            <Button variant="primary" onClick={() => navigate(`/auction/${auction.id}`)}>Shop now!</Button>
          </Card.Body>
        </Card>
      ) : (<></>)
    ))}
  </div>
);
}
    // <div className="card-container">
    //   {data.map((auction, index) => (
    //     <Card key={index} style={{ width: '18rem' }}>
    //       {auction.imageURL && <Card.Img variant="top" src={auction.imageURL} />}
          
    //       <Card.Body>
    //         <Card.Title>{auction.productName}</Card.Title>
    //         <Card.Text>
    //           <strong>Start Bid Price:</strong> ${auction.openPrice}<br />
    //           <strong>Buy Now Price:</strong> ${auction.buyNow}<br />
    //           <strong>End Date:</strong> {new Date(auction.endAt).toLocaleString()}<br />
    //           <strong>Description:</strong> {auction.description}<br />
    //         </Card.Text>
    //         <Button variant="primary">Shop now!</Button>
    //       </Card.Body>
    //     </Card>
    //   ))}
    // </div>

export default MyCard;
