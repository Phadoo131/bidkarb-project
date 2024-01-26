import React, { useState } from 'react';
import { openDispute } from '../../API/Dispute';
import { viewAuctionDetails } from '../../API/Auction';
import {useLoaderData, useNavigate } from 'react-router-dom';
import { getCurrentUser } from "../../util/APIUtils";

// this.routeList("/dispute",auction)

export async function loader({ params}) {
      
    console.log(params)
    const auction = await viewAuctionDetails(params.auctionId);
    // const user = await getCurrentUser(params.userId);
    const user = await getCurrentUser();

    if (!user || !auction) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return { auction, user };
    }

export async function action({request}) {
    console.log("Log request: ",request);
    let dispute = {request};
    let response = openDispute(request.auctionId.id, request.userId.id, request.dispute);

    console.log("dispute: ",dispute)
    console.log("reponse: ",response)
    return response; 
}

function Dispute() {
    const { auction, user } = useLoaderData()
    const navigate = useNavigate()
    const [dispute, setDispute] = useState({
        dispute:{description: dispute.description},
        userId: user,
        auctionId: auction.data,
    });

    const handleInputChange = (e) => {
        
        setDispute((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        console.log(event);

        try {
          await action({ request: dispute });
          navigate('/');
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div>
            <div>
                Auction ID:
                {auction.data.id}
            </div>
            {/* <h2>Dispute</h2> */}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input
                        type='text'
                        id="description"
                        name="description"
                        value={dispute.description}
                        onChange={handleInputChange}
                        placeholder="Description..."
                    />
                </div>
                <button type="submit">Confirm Dispute</button>
            </form>
        </div>
    );
}

export default Dispute;