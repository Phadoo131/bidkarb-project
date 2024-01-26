import ItemImage from "../common/ItemImage";
import NavBar from "../common/NavBar";
import Title from "../common/Title";
import AuctionForm from "../layout/AuctionForm";
import Layout2 from "../layout/Layout2";

export default function OpenAuction() {
  return (
    <>
      <Title title={"Open Auction"}>
        <Layout2 image={<ItemImage />} form={<AuctionForm />} />
      </Title>
    </>
  );
}
