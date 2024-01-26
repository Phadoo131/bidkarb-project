import React from 'react';
import Title from "../common/Title";
import AuctionsCardSearched from '../common/AuctionsCardSearched';

export default function AuctionsSearched() {

  return (
    <>
      <Title title={"Searched Auctions"}>
        <div >
            <AuctionsCardSearched />
        </div>
      </Title>
    </>
  );
}