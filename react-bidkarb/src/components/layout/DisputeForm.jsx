import Form from "react-bootstrap/Form";
import CustomButton from "../common/CustomButton";
import { viewAuctionDetails } from "../../API/Auction";
import { getCurrentUser } from "../../util/APIUtils";
import { openDispute } from "../../API/Dispute";
import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import ImageCloudUploader from '../../API/ImageCloudUploader';
import { Button, Container } from "react-bootstrap";

 
export async function loader({ params}) {
     
  console.log(params)
  const auction = await viewAuctionDetails(params.auctionId);
  const user = await getCurrentUser();
 
  console.log(auction)
 
  if (!user || !auction) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    console.log(auction, user)
    return { auction, user };
  }
 
export async function action({request, request2, request3, request4}) {
  let dispute = await request;
  let user = await request2;
  let auction = await request3;
  let image = await request4;
 
  let response = await openDispute(dispute, user.id, auction.data.id, image);
 
  console.log("description: ",dispute.description)
  console.log("user:", user.id)
  console.log("auction:", auction.data.id)
  console.log("image:", image)
  console.log("reponse: ", response)
  return response;
}
 
export default function DisputeForm() {
  const { auction, user } = useLoaderData()
  const navigate = useNavigate()
  const [dispute, setDispute] = useState({
          description: '',
      })
  const [image, setImage] = useState({
    imageURL: '',
  })


  const handleInputChange = (name, value) => {
     
      setDispute((prevData) => ({ ...prevData, [name]: value }));
  };
 
  const handleSubmit = async (event) => {
      event.preventDefault();
 
      console.log(dispute);
 
      try {
        await action({ request: dispute, request2: user, request3: auction, request4:image});
        alert("Your dispute has been recorded in Bidkarb's system, and we will ensure that it is brought to their attention for resolution. Then, we already anticipate a prompt and effective response. Please click 'Enter' to go back to the homepage.")
        navigate('/');
      } catch (error) {
        alert("Dispute Fileling Error! please try again.")
        console.error(error);
      }
  };
  
  const handleCloudinaryResult = (result) => {
    // Extract the URL from the result object
    const imageUrl = result.info.secure_url;

    setImage((preventImage) => ({
      ...preventImage,
      imageURL: imageUrl,
    }));
  };
 
  return (
    <>
    {/* <div className=" d-flex flex-column gap-4"> */}
    <Container className="containercolor gap-4 p-5">
      <div className="d-flex flex-column gap-2 ">
        <p className="mb-0 align-self-start">
          Auction ID: <strong>{auction.data.id}</strong>
        </p>
        <div className="d-flex gap-2 align-items-center">
          <div className="mb-0 text-nowrap">
            Please attach your evidence!
          </div>
          <ImageCloudUploader onUploadSuccess={handleCloudinaryResult} />
        </div>
        <Form onSubmit={(e)=> handleSubmit(e)} className="d-flex flex-column">
          <Form.Group className="mb-4 d-flex flex-column align-items-start">
            <Form.Label className="mb-0 text-nowrap ">Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your dispute detail here..."
              value={dispute.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
            />
          </Form.Group>

          <Button size="lg" className="align-self-end bg-indigo" type="submit">
            Confirm
          </Button>
        </Form>
      </div>
    </Container>
  </>
    // <>
    //   {/* <div className=" d-flex flex-column gap-4"> */}
    //   <div className="d-flex flex-column gap-3 w-50 m-auto root-withoutTextCenter containercolor">
    //     {/* <p className="px-5"> */}
    //       Auction ID: <strong>{auction.data.id}</strong>
    //       <ImageCloudUploader onUploadSuccess={handleCloudinaryResult} />
    //     {/* </p> */}
    //     <Form onSubmit={handleSubmit}>
 
    //     <Form.Group className="mb-0 px-5" controlId="formBasicEmail">
    //       <Form.Label className="mb-0 text-nowrap">Description</Form.Label>
    //       <Form.Control type="text"
    //                     placeholder="Enter your dispute detail here..."
    //                     value={dispute.description}
    //                     onChange={(e) => handleInputChange("description", e.target.value)}/>
    //     </Form.Group>
    //     <div className="align-self-end px-5 root-withoutTextCenter">
    //       <CustomButton>Confirm</CustomButton>
    //     </div>
    //     </Form>
    //   </div>
    // </>
  );
}