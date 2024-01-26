import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import CustomButton from "../common/CustomButton";
import { Container } from "react-bootstrap";
import { useLocation, useLoaderData, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { viewAuctionDetails } from '../../API/Auction';
import { createNewPayment } from '../../API/PaymentValidation'
import ImageCloudUploader from '../../API/ImageCloudUploader';

export async function loader({ params }) {

  const auction = await viewAuctionDetails(params.id);
  if (!auction) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { auction };
}

export async function action({ request }) {
  try{
    let payment = await request;
    let response = createNewPayment(payment);

    console.log(payment)
    console.log(response)
    return response; 
  } catch(error){
    console.log(error);
    alert("Payment Error! please try again.")
  }
}

export default function PaymentForm() {

  const {auction} = useLoaderData();
  const navigate = useNavigate();
  // console.log(auction);

  const [payment, setPayment] = useState({
      bankName: '',
      bankNumber: '',
      amount: 0,
      createdAt: '',
      address: '',
      imageURL: '',
      auction: auction.data,
  });

  const handleCloudinaryResult = (result) => {
      // Extract the URL from the result object
      const imageUrl = result.info.secure_url;
  
      setPayment((prevPayment) => ({
        ...prevPayment,
        imageURL: imageUrl,
      }));
    };


  const handleInputChange = (name, value) => {
      setPayment((prevPayment) => ({
          ...prevPayment,
          [name]: value,
      }));
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
  
      console.log(event);

      try {
        await action({ request: payment });
        navigate('/');
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <Container className="containercolor p-5 px-0 d-flex flex-column gap-4">
            <div className="d-flex flex-column gap-3 w-75 mx-auto">
                Auction ID:
                {auction.data.id}<br></br>
                Product Name:
                {auction.data.productName}<br></br>Please upload your payslip for the payment here!
                <ImageCloudUploader onUploadSuccess={handleCloudinaryResult} />
            </div>
        <Form className="d-flex flex-column gap-3 w-75 mx-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
          <Form.Label className="mb-0 text-nowrap">Bank Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your account holder bank.." value={payment.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
          <Form.Label className="mb-0 text-nowrap">Bank Account ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Account Id..." value={payment.bankNumber}
                    onChange={(e) => handleInputChange("bankNumber", e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
          <Form.Label className="mb-0 text-nowrap">Date&Time</Form.Label>
          <Form.Control type="datetime-local" placeholder="2077-12-31" value={payment.createdAt}
                    onChange={(e) => handleInputChange("createdAt", e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
          <Form.Label className="mb-0 text-nowrap">Shipping Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your address" value={payment.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
          <Form.Label className="mb-0 text-nowrap">Payment Amount</Form.Label>
          <Form.Control type="text" placeholder="Enter your Item price" value={payment.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}/>
        </Form.Group>
        <div className="align-self-end px-5">
          <Button type="submit" size="lg" className="bg-indigo">Confirm</Button>
        </div>
        </Form>
    </Container>
  );
}
