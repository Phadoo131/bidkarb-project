import React from 'react'
import { Link, Outlet} from "react-router-dom";
import MyAuctionNav from '../../components/MyAuctionNav';

export default function HomePage() {

  return (
    <>
        <div>HomePage</div>
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/payment">Payment</Link>
          </li>
          <li>
            <Link to="/openAuction/:id">Open Auction</Link>
          </li>
          <li>
            <Link to="/shipping">Shipping confirmation</Link>
          </li>
          <li>
            <Link to="/dispute">Dispute</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </>
  )
}
