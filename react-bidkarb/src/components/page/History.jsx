import { useLoaderData } from "react-router-dom";
import { useState, useEffect} from "react";
import { getCurrentUser } from "../../util/APIUtils";
import HistoryCard from "../common/HistoryCard";
import HistoryTab from "../common/HistoryTab";
import NavBar from "../common/NavBar";
import Title from "../common/Title";
import { historyRequestCancelled, historyRequestCompleted, historyRequestOngoing, historyRequestSales} from "../../API/Auction"

export async function loader(){
  try {
    const user = await getCurrentUser();

    return { user };

  } catch (error){

    console.error(error);
  }
}

export default function History() {

  const [selectedTab, setSelectedTab] = useState("1");
  // const [auctions, setAuctions] = useState([])
  const {user} = useLoaderData();

  const handleEventKey = (selectedKey)=>{
    setSelectedTab(selectedKey);
    console.log(selectedTab)
  }



  return (
    <>
      <Title title={"History"}>
        <div >
          <HistoryTab handleSelect={handleEventKey} selectedTab={selectedTab}/>
          
          <HistoryCard selectedTab={selectedTab} user={user}/>
          
        </div>
      </Title>
    </>
  );
}
