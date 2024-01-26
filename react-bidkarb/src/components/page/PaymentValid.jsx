import ItemImage from "../common/ItemImage";
import NavBar from "../common/NavBar";
import Title from "../common/Title";
import AuctionForm from "../layout/AuctionForm";
import DisputeForm from "../layout/DisputeForm";
import Layout2 from "../layout/Layout2";
import Layout3 from "../layout/Layout3";
import PaymentForm from "../layout/PaymentForm";


export default function PaymentValid() {

  return (
    <>
      <Title title={"Payment Validation"}>
        <Layout3 form={<PaymentForm />} />
      </Title>
    </>
  );
}
