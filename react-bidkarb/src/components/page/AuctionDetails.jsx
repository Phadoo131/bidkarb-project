import Layout from "../layout/Layout";
import Title from "../common/Title";
import BidDetails from "../layout/BidDetails";
import ItemDesc from "../layout/ItemDesc";
import NavBar from "../common/NavBar";
import ItemImage from "../common/ItemImage";
import { viewAuctionDetails } from "../../API/Auction";
import { useLoaderData } from "react-router-dom";
import { getAllBids, placeBid } from "../../API/Bidding";
import { getBkUserInfo } from "../../API/BidKarbUser";
import { getCurrentUser } from "../../util/APIUtils";
// import "./index.css";

export async function loader({params}){
  const auction = await viewAuctionDetails(params.auctionId);
  const currentUser = await getCurrentUser();

  if (auction.data.latestBid > 0){
    const allBids = await getAllBids();
    const buyer = await getBkUserInfo(auction.data.buyer.id);

    if (!auction && !buyer && !currentUser) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }

    const bids = allBids.data.filter((bid) => bid.auction.id === auction.data.id);

    return { auction, bids, buyer, currentUser };
  }

  const buyer = await getBkUserInfo(auction.data.seller.id);
  return { auction, currentUser, buyer };
}

export async function action({request, request2, request3}){
  const userId = await request;
  const auctId = await request2;
  const bid = await request3;

  const response = await placeBid(userId, auctId, bid);

  console.log(bid)
  console.log(response)
  return response; 
}


function AuctionDetails() {
  
  // const [bid, setBid] = useState({
    
  // });
  const {auction, bids, buyer, currentUser} = useLoaderData();

  // const allBids = await getAllBids();
  // const bids = allBids.data.filter((bid) => bid.auction.id === auction.data.id);
  
  return (
    <>
      <Title title={"Auction Details"}>
        <Layout
          image={<ItemImage src={auction.data.imageURL} w={400} h={400}/>}
          detail={auction.data.latestBid > 0 ? <BidDetails auction={auction.data} bids={bids} handlePlaceBid={action} currentUser={currentUser} /> : <BidDetails auction={auction.data} bids={0} handlePlaceBid={action} currentUser={currentUser} />}
          desc={<ItemDesc buyer={buyer} auction={auction.data}/>}
        />
      </Title>
    </>
  );
}

export default AuctionDetails;
