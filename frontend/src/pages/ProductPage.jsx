import React, { useState } from "react";

import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProductDetailsQuery,
  useCreateProductReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addCurrency } from "../utils/addCurrency";
import Reviews from "../components/Reviews";

const ProductPage = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const getImageUrl = (imagePath) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "http://your-production-url.com"
        : "http://localhost:5000";
    return `${baseUrl}${imagePath}`;
  };

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createProductReview, { isLoading: isCreateProductReviewLoading }] =
    useCreateProductReviewMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createProductReview({
        productId,
        rating,
        comment,
      });
      if (res.error) {
        toast.error(res.error?.data?.message);
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

    setRating(0);
    setComment("");
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" className="text-center p-4 text-xl">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Link
            to="/"
            className="btn btn-light my-3 px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg transition-all duration-300"
          >
            Go Back
          </Link>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={5}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="rounded-lg shadow-lg"
              />
              <Row className="review d-none d-md-block mt-4">
                <Col>
                  <Reviews
                    product={product}
                    userInfo={userInfo}
                    rating={rating}
                    loading={isCreateProductReviewLoading}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    submitHandler={submitHandler}
                  />
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-b">
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item className="border-b py-3">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    className="text-yellow-500"
                  />
                </ListGroup.Item>

                <ListGroup.Item className="border-b py-3">
                  <p className="text-lg">
                    Price:{" "}
                    <span className="font-semibold">
                      {addCurrency(product.price)}
                    </span>
                  </p>
                </ListGroup.Item>

                <ListGroup.Item className="border-b py-3">
                  <strong>About this item:</strong>
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card className="shadow-lg rounded-lg">
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-b py-3">
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{addCurrency(product.price)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-b py-3">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <span
                          className={`font-semibold ${
                            product.countInStock > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className="border-b py-3">
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="border-gray-300 rounded-md"
                          >
                            {Array.from(
                              { length: product.countInStock },
                              (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroupItem className="p-3">
                    <Button
                      className="w-full py-2 text-lg bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className="review d-block d-md-none mt-4">
            <Col>
              <Reviews
                product={product}
                userInfo={userInfo}
                rating={rating}
                loading={isCreateProductReviewLoading}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                submitHandler={submitHandler}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
