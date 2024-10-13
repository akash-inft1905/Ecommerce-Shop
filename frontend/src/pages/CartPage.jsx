import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Image,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { FaIndianRupeeSign } from "react-icons/fa6";

import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Meta from "../components/Meta";
import { addCurrency } from "../utils/addCurrency";
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  const getImageUrl = (imagePath) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "http://your-production-url.com"
        : "http://localhost:5000";
    return `${baseUrl}${imagePath}`;
  };

  return (
    <>
      <Meta title={"Shopping Cart"} />
      <h1 style={{ textAlign: "center", margin: "20px 0", color: "#ffbb33" }}>
        Shopping Cart
      </h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 && (
            <Message
              style={{ textAlign: "center", fontSize: "18px", color: "#555" }}
            >
              Cart is empty{" "}
              <Link
                to="/"
                style={{
                  color: "#ffbb33",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Go Back
              </Link>
            </Message>
          )}
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item
                className="my-3"
                key={item._id}
                style={{
                  borderRadius: "8px",
                  padding: "15px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Row style={{ alignItems: "center" }}>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      style={{ border: "1px solid #ddd", padding: "3px" }}
                    />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item._id}`}
                      className="product-title text-dark"
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2} style={{ fontSize: "16px", color: "#333" }}>
                    {addCurrency(item.price)}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    >
                      {Array.from({ length: item.countInStock }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                      style={{
                        padding: "5px",
                        border: "none",
                        backgroundColor: "#f8f8f8",
                      }}
                    >
                      <FaTrash style={{ color: "red", fontSize: "18px" }} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          {cartItems.length > 0 && (
            <Card
              style={{
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListGroup variant="flush">
                <ListGroup.Item style={{ padding: "20px 10px" }}>
                  <h2
                    style={{
                      fontSize: "22px",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  <p style={{ fontSize: "18px", color: "#555" }}>
                    {addCurrency(
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroupItem style={{ padding: "20px 10px" }}>
                  <Button
                    className="w-100"
                    variant="warning"
                    type="button"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    style={{
                      padding: "12px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "#ffbb33",
                      border: "none",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
