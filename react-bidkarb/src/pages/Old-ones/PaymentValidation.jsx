/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import { useLocation, useLoaderData, useNavigate } from 'react-router-dom';
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
    let payment = await request;
    let response = createNewPayment(payment);

    console.log(payment)
    console.log(response)
    return response; 
}

function PaymentValidation() {

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


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPayment((prevPayment) => ({
            ...prevPayment,
            [name]: value,
        }));

        console.log(payment);
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
        <>
            <div>
                <ImageCloudUploader onUploadSuccess={handleCloudinaryResult} />
            </div>
        <form onSubmit={handleSubmit}>
            <div>
                Auction ID:
                {auction.data.id}<br></br>
                Product Name:
                {auction.data.productName}
            </div>
            <div>
                <label htmlFor="bankName">Bank Name:</label>
                <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={payment.bankName}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="bankNumber">Bank Number:</label>
                <input
                    type="text"
                    id="bankNumber"
                    name="bankNumber"
                    value={payment.bankNumber}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={payment.amount}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="createdAt">Created At:</label>
                <input
                    type="datetime-local"
                    id="createdAt"
                    name="createdAt"
                    value={payment.createdAt}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={payment.address}
                    onChange={handleInputChange}
                />
            </div>

            <button type="submit">Submit Payment</button>
        </form>
        </>
    );
}

export default PaymentValidation;
