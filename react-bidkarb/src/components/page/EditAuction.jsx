import ItemImage from "../common/ItemImage";
import NavBar from "../common/NavBar";
import Title from "../common/Title";
import EditAuctionForm from "../layout/EditAuctionForm";
import Layout2 from "../layout/Layout2";

export default function EditAuction() {
  return (
    <>
      <Title title={"Edit Auction"}>
        <Layout2 image={<ItemImage />} form={<EditAuctionForm />} />
      </Title>
    </>
  );
}
