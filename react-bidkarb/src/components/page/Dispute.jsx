import ItemImage from "../common/ItemImage";
import NavBar from "../common/NavBar";
import Title from "../common/Title";
import AuctionForm from "../layout/AuctionForm";
import DisputeForm from "../layout/DisputeForm";
import Layout2 from "../layout/Layout2";
import Layout3 from "../layout/Layout3";

export default function Dispute() {
  return (
    <>
      <Title title={"Dispute"}>
        <Layout3 form={<DisputeForm />} />
      </Title>
    </>
  );
}
