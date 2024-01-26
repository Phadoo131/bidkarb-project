import React, { useState } from "react";
import { getCurrentUser } from "../../util/APIUtils";
// import { useLoaderData } from "react-router-dom";
import { fillBkUserInfo } from "../../API/BidKarbUser";
import { useNavigate } from "react-router-dom";
import "../../custom.css";
import { Button } from "react-bootstrap";

export async function action({ request }) {

    try {
        let response = await fillBkUserInfo(request);
        console.log(request);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be caught in the calling component
    }
}

export default function BidKarbUserInfo({fillBkUser, setFilledBkUser}) {
    // const {user} = useLoaderData();
    const navigate = useNavigate();
    
    const [bkUserInfo, setBkUserInfo] = useState({
        firstName: "",
        lastName: "",
        telNum: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBkUserInfo((prevShipping) => ({ ...prevShipping, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const actionResponse = await action({ request: bkUserInfo });

        console.log("Before navigation");
        setFilledBkUser(true);
        return navigate("/", { replace: true });

          } catch (error) {
            console.error(error);
          }
        
    };

    return (
        <>
        <h2>User Information</h2>
   
        <form
          className="containercolor d-flex flex-column align-items-center gap-2 px-5 py-5"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column align-items-start w-50">
            <label className="form-label">Firstname</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={bkUserInfo.firstName}
              className="form-control"
              onChange={handleInputChange}
              placeholder="First name...."
            />
          </div>
          <div className="d-flex flex-column align-items-start w-50">
            <label className="form-label">Lastname</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={bkUserInfo.lastName}
              className="form-control"
              onChange={handleInputChange}
              placeholder="Last name...."
            />
          </div>
          <div className="d-flex flex-column align-items-start w-50">
            <label className="form-label">Telephone number</label>
            <input
              type="text"
              id="telNum:"
              name="telNum"
              value={bkUserInfo.telNum}
              className="form-control"
              onChange={handleInputChange}
              placeholder="Tel num...."
            />
          </div>
   
          <Button size="lg" type="submit" className="bg-indigo">
            Comfirm Your Information!
          </Button>
        </form>
      </>
    );
}