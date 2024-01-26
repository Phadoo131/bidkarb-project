import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div>HomePage</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/payment">Payment Validation</Link>
          </li>
          <li>
            <Link to="/openAuction">Open Auction</Link>
          </li>

          <li>
            <Link to="/editAuction/">Edit Auction</Link>
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
  );
}
