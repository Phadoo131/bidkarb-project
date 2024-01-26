import { Button } from "react-bootstrap";
import { buyNow, placeBid } from "../../API/Bidding";
import "../../custom.css";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({ auction, bids, user, onClose , child}) {

  const navigate = useNavigate();
  const handleBuyNow = async (e) =>{
    e.preventDefault();

      try {
        const response = await buyNow(user.id, auction.id)
        console.log(response);


        alert('BuyNow submitted:', auction.buyNow)
        navigate(-1);

      } catch(error){
        console.error(error);
      }
  }


  const fee = (parseInt(auction.buyNow) * (0.07)).toFixed(2);
  const total = parseInt(parseInt(auction.buyNow) + parseInt(fee)).toFixed(2);
  
  return (
    <div className="w-50 d-flex flex-column containercolor p-5 px-0 mx-auto  ">
      <div className="d-flex flex-column w-75 mx-auto my-5">
        <div className="d-flex justify-content-between">
          <p className="mb-2">Subtotal</p>
          <p className="mb-2">{auction.buyNow}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="mb-2">Fee</p>
          <p className="mb-2">{fee}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="mb-4">
            <strong>Total</strong>
          </p>
          <p className="mb-4">
            <strong>{total}</strong>
          </p>
        </div>
      </div>
      <Button className="align-self-center" onClick={(e) => handleBuyNow(e)}>{child}</ Button>
    </div>
  );
}
