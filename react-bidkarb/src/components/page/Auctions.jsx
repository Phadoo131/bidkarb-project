import React from 'react';
import Title from "../common/Title";
import AuctionsCard from '../common/AuctionsCard';

export default function Auctions() {

  return (
    <>
      <Title title={"All Auctions"}>
        <div >
            <AuctionsCard />
        </div>
      </Title>
    </>
  );
}