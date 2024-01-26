import NavBar from "../common/NavBar";
import Title from "../common/Title";
import OrderSummary from "../layout/OrderSummary";

export default function BidSummary() {
  return (
    <>
      <Title title={"Order Summary "}>
        <OrderSummary>Confirm</OrderSummary>
      </Title>
    </>
  );
}
