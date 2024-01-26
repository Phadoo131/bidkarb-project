import React from 'react';
//import { Route, Routes } from 'react-router-dom';
import { Outlet} from 'react-router-dom';
import {loader as shippingLoader, action as shippingAction} from '../../pages/Old-ones/Shipping';
import Shipping from '../../pages/Old-ones/Shipping'
import ReceiveConfirm from '../page/ReceiveConfirm';
import {action as receiveAction, loader as receiveLoader} from './ReceiveForm';
import BidKarbHome from '../Bank/Homepage/BidKarbHome';
import PaymentValid from '../page/PaymentValid';
import Dispute from '../page/Dispute';
import {action as disputeAction, loader as disputeLoader} from '../layout/DisputeForm'
import {loader as paymentValidationLoader, action as paymentValidationAction} from './PaymentForm';
import {action as auctionAction, loader as auctionLoader} from '../layout/AuctionForm'
import OpenAuction from '../page/OpenAuction';
import AuctionDetails, {loader as auctionDetailsLoader} from '../page/AuctionDetails';
import History, {loader as historyLoader} from '../page/History';
import Auctions from '../page/Auctions';
import EditAuction from '../page/EditAuction';
import {loader as editLoader, action as editAction} from '../layout/EditAuctionForm';
import AuctionsSearched from '../page/SearchResult';
import {loader as searchedLoader} from '../common/AuctionsCardSearched'


export  const routeList = [
    {index:true, element: <BidKarbHome />},
    { path: "home", element: <BidKarbHome /> },
    {
      path: "payment/:id",
      element: <PaymentValid />,
      loader: paymentValidationLoader,
      action: paymentValidationAction,
    },
    {
      path: "dispute/:auctionId",
      element: <Dispute />,
      loader: disputeLoader,
      action: disputeAction,
    },
    {
      path: "shipping/:auctionId",
      element: <Shipping />,
      loader: shippingLoader,
      action: shippingAction,
    },
    {
      path: "received/:auctionId",
      element: <ReceiveConfirm />,
      loader: receiveLoader,
      action: receiveAction,
    },
    {
      path: "auction/new",
      element: <OpenAuction />,
      loader: auctionLoader,
      action: auctionAction,
    },
    {
      path: "auction/:auctionId",
      element: <AuctionDetails />,
      loader: auctionDetailsLoader,
    },
    {
      path: "auctions/new",
      element: <OpenAuction />,
      loader: auctionLoader,
      action: auctionAction,
    },
    {
      path: "auctions/edit/:auctionId",
      element: <EditAuction />,
      loader: editLoader,
      action: editAction,
    },
    {
      path: "history/",
      element: <History />,
      loader: historyLoader,
    },
    {
      path: "auctions/",
      element: <Auctions />,
    },
    {
      path: "auctions/:auctionName",
      element: <AuctionsSearched />,
      loader: searchedLoader,
    },
  ];
 
function Main() {
  return (
    <main>
      <Outlet/>
    </main>
  );
}

export default Main;

