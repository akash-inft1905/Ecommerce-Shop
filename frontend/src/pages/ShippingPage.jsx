import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <FormContainer className="py-5">
      {/* Steps and Meta Information */}
      <CheckoutSteps step1 step2 />
      <Meta title="Shipping" />

      {/* Heading */}
      <h1 className="text-center text-3xl font-semibold mb-4">Shipping</h1>

      {/* Shipping Form */}
      <Form onSubmit={submitHandler} className="space-y-4">
        {/* Address Field */}
        <Form.Group controlId="address" className="mb-4">
          <Form.Label className="font-medium">Address</Form.Label>
          <Form.Control
            value={address}
            type="text"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300"
          />
        </Form.Group>

        {/* City Field */}
        <Form.Group controlId="city" className="mb-4">
          <Form.Label className="font-medium">City</Form.Label>
          <Form.Control
            value={city}
            type="text"
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300"
          />
        </Form.Group>

        {/* Postal Code Field */}
        <Form.Group controlId="postalCode" className="mb-4">
          <Form.Label className="font-medium">Postal Code</Form.Label>
          <Form.Control
            value={postalCode}
            type="text"
            placeholder="Enter postal code"
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300"
          />
        </Form.Group>

        {/* Country Field */}
        <Form.Group controlId="country" className="mb-4">
          <Form.Label className="font-medium">Country</Form.Label>
          <Form.Control
            value={country}
            type="text"
            placeholder="Enter country"
            onChange={(e) => setCountry(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300"
          />
        </Form.Group>

        {/* Continue Button */}
        <Button
          className="w-full py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all"
          type="submit"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
