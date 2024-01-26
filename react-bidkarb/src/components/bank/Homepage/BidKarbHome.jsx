import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.css';
import MyCard from '../compo/MyCard';
import MyButton from '../compo/MyButton';
import MyPagination from '../compo/MyPagination';
import ScrollReveal from 'scrollreveal';
import { getAllAuction } from '../../../API/Auction';
import { isAuthenticated } from '../../../util/APIUtils';

const BidKarbHome = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000 * 60 * 5); // Fetch data every 5 minutes

    return () => clearInterval(intervalId);
  }, [currentPage]);

  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal('.reveal', {
      duration: 2000,
      delay: 400,
      distance: '30px',
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      origin: 'bottom',
      scale: 3,
    });
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllAuction();
      const currentTime = new Date();

      // Filter out expired auctions
      const newAuctions = response.data.filter(auction => new Date(auction.endAt) > currentTime);

      setData(newAuctions);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDataSubset = data.slice(startIndex, endIndex);

  const authenticated = isAuthenticated();


  return (
    <div className="container reveal">
          <p className="unlock-excitement reveal">&#34;Unlock Excitement, Bid with Confidence.&#34;</p>
          <br />
          <br />
          {authenticated ? (
        // Render content for authenticated users (product display window)
        <>
          <MyCard className="reveal" data={currentDataSubset} />
          <br />
          <br />
          <MyPagination
            className="reveal"
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            onPageChange={(page) => setCurrentPage(page)}
          />
          </>
      ) : (
        <img src="../../../../src/img/123456.jpg" alt="Website Cover" style={{width : '120%', height : 'auto'}}/>
      )}
      <br />
      <br />
      <div className="test reveal">
        <h1 className="text-title">WHAT WE BELIEVE</h1>
        <p>
          At BIDDING, we believe in the power of connection and the excitement of the bidding experience. Our platform is
          built on the foundation of fairness, transparency, and the joy of discovering unique items and currencies. We
          believe that every bid is an opportunity for our users to explore, engage, and win in a community-driven
          marketplace.
        </p>
        <br />
        <br />
        <br />
        <p>
          Welcome to BIDDING – the premier destination for dynamic auctions of various items and currencies. Founded [Year
          of Establishment], our platform was born out of a passion for redefining online auctions. We envisioned a space
          where users could immerse themselves in the thrill of bidding, discover one-of-a-kind treasures, and engage in a
          community that values both excitement and integrity.
        </p>
      </div>
    </div>
  );
};

export default BidKarbHome;
