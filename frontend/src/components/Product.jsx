import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCurrency } from "../utils/addCurrency";
import { addToCart } from "../slices/cartSlice";
import Rating from "./Rating";

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getImageUrl = (imagePath) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "http://your-production-url.com"
        : "http://localhost:5000";
    return `${baseUrl}${imagePath}`;
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <Card
      className="my-3 p-3 rounded text-center "
      style={{ backgroundImage: "linear-gradient(164deg, #ebb9b9, #cfa6a6);" }}
    >
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none" }}
        className="text-dark"
      >
        <Card.Img
          variant="top"
          src={getImageUrl(product.image)}
          style={{ height: "200px", objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as="div" className="mb-3">
            <Rating
              value={product.rating}
              text={`(${product.numReviews} reviews)`}
            />
          </Card.Text>
          <Card.Text as="h3">{addCurrency(product.price)}</Card.Text>
        </Card.Body>
      </Link>
      <Button
        variant="warning"
        type="button"
        disabled={product.countInStock === 0}
        onClick={addToCartHandler}
      >
        Add To Cart
      </Button>
    </Card>
  );
};

export default Product;
