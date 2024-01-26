import { Button } from "react-bootstrap";
import { buyNow, placeBid } from "../../API/Bidding";
import "../../custom.css";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";

export default function OrderSummaryPB({ auction, bid, user, onClose , child}) {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await placeBid(user.id, auction.id, bid);
        console.log('Bid Amount submitted:');
        alert('Bid Amount submitted: ');

        navigate(-1);

    } catch(error){
      alert("Cannot bid less than Open price or min bid amount!")
      console.error(error);
    }
  };


  const fee = (parseInt(bid.amount) * (0.07)).toFixed(2);
  const total = parseInt(parseInt(bid.amount) + parseInt(fee)).toFixed(2);
  
  return (
    <div className="w-50 d-flex flex-column containercolor p-5 px-0 mx-auto  ">
      <div className="d-flex flex-column w-75 mx-auto my-5">
        <div className="d-flex justify-content-between">
          <p className="mb-2">Subtotal</p>
          <p className="mb-2">{bid.amount}</p>
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
      <Button className="align-self-center" onClick={(e) => handleSubmit(e)}>{child}</ Button>
    </div>
  );
}
