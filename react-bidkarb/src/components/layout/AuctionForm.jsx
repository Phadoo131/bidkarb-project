import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Row } from "react-bootstrap";
import React, { useState } from "react";
// import moment from "moment";
import CustomButton from "../common/CustomButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../util/APIUtils";
import { createAuction } from "../../API/Auction";
import ImageCloudUploader from "../../API/ImageCloudUploader";

export async function loader() {
  const user = await getCurrentUser();

  console.log("User:", user);

  if (!user) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { user };
}

export async function action({ request, request2 }) {
  let auction = await request;
  let user = await request2;

  let response = await createAuction(auction, user.id);

  console.log("auction:", auction);
  console.log("user:", user);
  return response;
}

export default function AuctionForm() {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [auction, setAuction] = useState({
    id: "",
    productName: "",
    productCategory: "",
    quality: "",
    openPrice: "",
    minBid: "",
    buyNow: "",
    startAt: "",
    endAt: "",
    description: "",
    bankName: "",
    bankNumber: "",
    imageURL: "",
  });

  const handleCategoryChange = (categoryId) => {
    const selectedCategory = {
      id: Number(categoryId),
      categoryName: getCategoryNameById(Number(categoryId)),
    };

    setAuction((prevData) => ({
      ...prevData,
      productCategory: selectedCategory,
    }));
  };

  const getCategoryNameById = (categoryId) => {
    const categoryMapping = {
      1: "Electronic",
      2: "Vehicle",
      3: "Cloth",
      4: "Furniture",
      5: "Accessories",
      6: "Other",
    };
    return categoryMapping[categoryId] || "";
  };

  const handleChange = (name, value) => {
    setAuction((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(auction);

    try {
      await action({ request: auction, request2: user });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloudinaryResult = (result) => {
    // Extract the URL from the result object
    const imageUrl = result.info.secure_url;

    setAuction((prevAuction) => ({
      ...prevAuction,
      imageURL: imageUrl,
    }));
  };

  return (
    <>
    <Col>
    <br></br>Your product image
     <ImageCloudUploader onUploadSuccess={handleCloudinaryResult} />
    </Col>
      <Form onSubmit={handleSubmit}>
        <Row xs={1} sm={1} lg={2}>
          <Col>
            <Form.Group className="mb-0" controlId="formBasicEmail">
              <Form.Label className="mb-0 text-nowrap">Item name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Item name"
                value={auction.productName}
                onChange={(e) => handleChange("productName", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0" controlId="formBasicPassword">
              <Form.Label className="mb-0 text-nowrap">Category</Form.Label>
              <select
                className="form-select"
                value={auction.productCategory.categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value={null}>--Please choose an option--</option>
                <option value={1}>Electronic</option>
                <option value={2}>Vehicle</option>
                <option value={3}>Cloth</option>
                <option value={4}>Furniture</option>
                <option value={5}>Accessories</option>
                <option value={6}>Other</option>
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Row xs={1} sm={1} lg={3}>
          <Col>
            <Form.Group className="mb-0 " controlId="formBasicEmail">
              <Form.Label className="mb-0 text-nowrap">
                Buy now price
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={auction.buyNow}
                onChange={(e) => handleChange("buyNow", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0 " controlId="formBasicEmail">
              <Form.Label className="mb-0 text-nowrap">
                Start bid price
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={auction.openPrice}
                onChange={(e) => handleChange("openPrice", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0 " controlId="formBasicEmail">
              <Form.Label className="mb-0 text-nowrap">
                Min bid price
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={auction.minBid}
                onChange={(e) => handleChange("minBid", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row xs={1} sm={1} lg={3}>
          <Col>
            <Form.Group className="mb-0 " controlId="formBasicEmail">
              <Form.Label className="mb-0 text-nowrap">Quality</Form.Label>
              <select
                className="form-select"
                value={auction.quality}
                onChange={(e) => handleChange("quality", e.target.value)}
              >
                <option value="">--Please choose an option--</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0 " controlId="formBasicEmail">
              <Form.Label className="mb-0 text-nowrap">
                Start auction
              </Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="2024-12-12"
                value={auction.startAt}
                onChange={(e) => handleChange("startAt", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0 " controlId="formBasicEmail">
              <Form.Label className="mb-0 text-nowrap">End auction</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="2024-12-12"
                value={auction.endAt}
                onChange={(e) => handleChange("endAt", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-0 " controlId="formBasicEmail">
          <Form.Label className="mb-0 text-nowrap">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={auction.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-0 " controlId="formBasicEmail">
          <Form.Label className="mb-0 text-nowrap">Bank name</Form.Label>
          <select
            className="form-select"
            value={auction.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value="SCB">SCB</option>
            <option value="KTB">KTB</option>
            <option value="K-Bank">K-Bank</option>
          </select>
        </Form.Group>
        <Form.Group className="mb-4 " controlId="formBasicEmail">
          <Form.Label className="mb-0 text-nowrap">Bank Account ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Account Id..."
            value={auction.bankNumber}
            onChange={(e) => handleChange("bankNumber", e.target.value)}
          />
        </Form.Group>
        <div className="align-self-end">
          <CustomButton size="lg">Confirm</CustomButton>
        </div>
      </Form>
    </>
  );
}
