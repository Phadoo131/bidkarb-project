import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
// import moment from "moment";
import CustomButton from "../common/CustomButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../util/APIUtils";
import { viewAuctionDetails } from "../../API/Auction";
import { editAuction } from "../../API/Auction";
import "../../custom.css";
import ImageCloudUploader from "../../API/ImageCloudUploader";

export async function loader({ params }) {
  const auction = await viewAuctionDetails(params.auctionId);

  //console.log("Auction:", auction.data.id);

  if (!auction) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { auction };
}

export async function action({ request }) {
  console.log(request);

  let auction = await request;

  let response = await editAuction(auction.id, auction);
  console.log(response);

  console.log("auction:", auction);
  return response;
}

export default function EditAuctionForm() {
  const { auction } = useLoaderData();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(auction.data);

  const handleCategoryChange = (categoryId) => {
    const selectedCategory = {
      id: Number(categoryId),
      categoryName: getCategoryNameById(Number(categoryId)),
    };

    setEdit((prevData) => ({
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
    setEdit((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(edit);

    try {
      await action({ request: edit });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloudinaryResult = (result) => {
    // Extract the URL from the result object
    const imageUrl = result.info.secure_url;

    setEdit((prevAuction) => ({
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
            <Form.Group className="mb-0" controlId="itemName">
              <Form.Label className="mb-0 text-nowrap">Item name</Form.Label>
              <Form.Control
                type="text"
                placeholder={auction.data.productName}
                value={edit.productName}
                onChange={(e) => handleChange("productName", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0" controlId="Category">
              <Form.Label className="mb-0 text-nowrap">Category</Form.Label>
              <select
                className="form-select"
                value={edit.productCategory.categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value={null} disabled selected hidden>
                  {auction.data.productCategory.categoryName}
                </option>
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
            <Form.Group className="mb-0 " controlId="buyNowPrice">
              <Form.Label className="mb-0 text-nowrap">
                Buy now price
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={auction.data.buyNow}
                value={edit.buyNow}
                onChange={(e) => handleChange("buyNow", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0 " controlId="startBidPrice">
              <Form.Label className="mb-0 text-nowrap">
                Start bid price
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={auction.data.openPrice}
                value={edit.openPrice}
                onChange={(e) => handleChange("openPrice", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0 " controlId="minBidPrice">
              <Form.Label className="mb-0 text-nowrap">
                Min bid price
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={auction.data.minBid}
                value={edit.minBid}
                onChange={(e) => handleChange("minBid", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row xs={1} sm={1} lg={3}>
          <Col>
            <Form.Group className="mb-0 " controlId="quality">
              <Form.Label className="mb-0 text-nowrap">Quality</Form.Label>
              <select
                className="form-select"
                value={edit.quality}
                onChange={(e) => handleChange("quality", e.target.value)}
              >
                <option value="">--Please choose an option--</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0 " controlId="startDate">
              <Form.Label className="mb-0 text-nowrap">
                Start auction
              </Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder={auction.data.startAt}
                value={edit.startAt}
                onChange={(e) => handleChange("startAt", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-0 " controlId="endDate">
              <Form.Label className="mb-0 text-nowrap">End auction</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder={auction.data.endAt}
                value={edit.endAt}
                onChange={(e) => handleChange("endAt", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-0 " controlId="desc">
          <Form.Label className="mb-0 text-nowrap">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder={auction.data.description}
            value={edit.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-0 " controlId="bank">
          <Form.Label className="mb-0 text-nowrap">Bank name</Form.Label>
          <select
            className="form-select"
            value={edit.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value="SCB">SCB</option>
            <option value="KTB">KTB</option>
            <option value="K-Bank">K-Bank</option>
          </select>
        </Form.Group>

        <Form.Group className="mb-4 " controlId="bankId">
          <Form.Label className="mb-0 text-nowrap">Bank Account ID</Form.Label>
          <Form.Control
            type="text"
            placeholder={auction.data.bankNumber}
            value={edit.bankNumber}
            onChange={(e) => handleChange("bankNumber", e.target.value)}
          />
        </Form.Group>

        <div className="align-self-end">
          <CustomButton size="lg" className="bg-indigo">
            Confirm
          </CustomButton>
        </div>
      </Form>
    </>
  );
}
