import React, { useState } from 'react';
import { openDispute } from '../../API/Dispute';
import { viewAuctionDetails } from '../../API/Auction';
import {useLoaderData, useNavigate } from 'react-router-dom';
import { getCurrentUser } from "../../util/APIUtils";


export async function loader({ params}) {
      
    console.log(params)
    const auction = await viewAuctionDetails(params.auctionId);
    const user = await getCurrentUser();

    console.log(auction)

    if (!user || !auction) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return { auction, user };
    }

export async function action({request, request2, request3}) {
    let dispute = await request;
    let user = await request2;
    let auction = await request3;

    let response = openDispute(dispute, user.id, auction.id);

    console.log("dispute: ",dispute)
    console.log("user:", user)
    console.log("auction:", auction)
    console.log("reponse: ", response)
    return response; 
}

function Dispute() {
    const { auction, user } = useLoaderData()
    const navigate = useNavigate()
    const [dispute, setDispute] = useState({
            description: '',
        },
    );

    const handleInputChange = (e) => {
        
        setDispute((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        console.log(dispute);

        try {
          await action({ request: dispute, request2: user, request3: auction.data});
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