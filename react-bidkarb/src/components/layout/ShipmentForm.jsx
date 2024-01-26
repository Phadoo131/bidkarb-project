import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import CustomButton from "../common/CustomButton";
import "../../custom.css";
import { viewAuctionDetails } from '../../API/Auction';
import { confirmShipping } from '../../API/Shipping';
import { useNavigate, useLoaderData } from 'react-router-dom';
 
export async function loader({ params }) {
  //in Auction => Set navigate("/shipping/${auction.id}")
      const auction = await viewAuctionDetails(params.auctionId);
      if (!auction) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return { auction };
  }
   
  export async function action({ request }) {
      let shipping = await request;
      let response = confirmShipping(shipping);
 
      console.log(shipping)
      console.log(response)
      return response;
  }
 
  const Shipping = () => {
 
      const {auction} = useLoaderData();
      const navigate = useNavigate()
 
     
      // const [id, setId] = useState(1);
      const [shipping, setShipping] = useState({
          // id: id,
          trackingNumber: "",
          shippingCompany: "",
          otherShippingCompany: "",
          auction: auction.data,
      });
 
      const handleInputChange = (event) => {
          const { name, value } = event.target;
          setShipping((prevShipping) => ({ ...prevShipping, [name]: value }));
      };
 
      const handleSubmit = async (event) => {
          event.preventDefault();
 
          try {
              await action({ request: shipping });
              alert("Your shipment is already record to our system and notified to buyer. Please 'Enter' to homepage.")
              navigate("/")
              // setId(id + 1);
            } catch (error) {
              console.error(error);
            }
         
      };
     
  return (
    <>
      <div className=" p-5 containercolor ">
        <Form className="w-75 mx-auto d-flex flex-column">
          <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
            <Form.Label className="mb-0 text-nowrap">
              Shipment Company
            </Form.Label>
            <Dropdown className="form-floating">
              <select className="form-select">
                <option value="">--Please choose an option--</option>
                <option value="Thaipost">Thaipost</option>
                <option value="Flash">Flash</option>
                <option value="Kerry">Kerry</option>
                <option value="J&T">J&T</option>
                <option value="Ninja Van">Ninja Van</option>
              </select>
            </Dropdown>
          </Form.Group>
 
          <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
            <Form.Label className="mb-0 text-nowrap">Other shipment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please input your shipment"
            />
          </Form.Group>
 
          <Form.Group className="mb-0 px-5 mb-4" controlId="formBasicEmail">
            <Form.Label className="mb-0 text-nowrap">
              Tracking number
            </Form.Label>
            <Form.Control type="text" placeholder="Enter Account Id..." />
          </Form.Group>
          <div className="align-self-end px-5">
            <CustomButton>Confirm</CustomButton>
          </div>
        </Form>
      </div>
    </>
  );
}