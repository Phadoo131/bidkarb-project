import ItemImage from "../common/ItemImage";
import NavBar from "../common/NavBar";
import Title from "../common/Title";
import AuctionForm from "../layout/AuctionForm";
import DisputeForm from "../layout/DisputeForm";
import Layout2 from "../layout/Layout2";
import Layout3 from "../layout/Layout3";
import PaymentForm from "../layout/PaymentForm";
import ShipmentForm from "../layout/ShipmentForm";

export default function Shipment() {
  return (
    <>
      <Title title={"Shipment"}>
        <Layout3 form={<ShipmentForm />} />
      </Title>
    </>
  );
}
