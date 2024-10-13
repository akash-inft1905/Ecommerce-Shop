import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup, Card, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Meta from "../components/Meta";
import { addCurrency } from "../utils/addCurrency";

const PlaceOrderPage = () => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const getImageUrl = (imagePath) => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "http://your-production-url.com"
        : "http://localhost:5000";
    return `${baseUrl}${imagePath}`;
  };

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Meta title="Place Order" />
      <Row className="gap-6">
        {/* Left Column: Shipping, Payment, and Order Items */}
        <Col md={8}>
          <ListGroup variant="flush" className="space-y-4">
            {/* Shipping Details */}
            <ListGroup.Item className="p-4 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Shipping</h2>
              <p className="text-lg">
                <strong>Address: </strong>
                {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
              </p>
            </ListGroup.Item>

            {/* Payment Method */}
            <ListGroup.Item className="p-4 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
              <p className="text-lg">
                <strong>Method: </strong> {paymentMethod}
              </p>
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item className="p-4 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
              <ListGroup variant="flush" className="space-y-3">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id} className="flex items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={6}>
                      <Link
                        to={`/product/${item._id}`}
                        className="product-title text-dark hover:text-blue-600 transition-all"
                        style={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4} className="text-right text-lg">
                      {item.qty} x {addCurrency(item.price)} ={" "}
                      <span className="font-semibold">
                        {addCurrency(item.qty * item.price)}
                      </span>
                    </Col>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right Column: Order Summary */}
        <Col md={4}>
          <Card className="p-6 bg-white shadow-lg rounded-lg">
            <ListGroup variant="flush">
              {/* Order Summary Title */}
              <ListGroup.Item className="pb-4">
                <h2 className="text-3xl font-bold text-center">
                  Order Summary
                </h2>
              </ListGroup.Item>

              {/* Order Summary Details */}
              <ListGroup.Item className="py-3">
                <Row>
                  <Col className="text-lg">Items:</Col>
                  <Col className="text-right text-lg">
                    {addCurrency(Number(itemsPrice))}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col className="text-lg">Shipping:</Col>
                  <Col className="text-right text-lg">
                    {addCurrency(Number(shippingPrice))}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col className="text-lg">Tax:</Col>
                  <Col className="text-right text-lg">
                    {addCurrency(Number(taxPrice))}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col className="text-lg font-bold">Total:</Col>
                  <Col className="text-right text-lg font-bold">
                    {addCurrency(Number(totalPrice))}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Place Order Button */}
              <ListGroup.Item className="py-4">
                <Button
                  className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all"
                  type="button"
                  disabled={cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
