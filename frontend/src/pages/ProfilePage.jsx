import React from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import ProfileForm from "../components/ProfileForm";
import { addCurrency } from "../utils/addCurrency";

const ProfilePage = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <>
      <Row className="py-4">
        <Col md={3} className="border-right">
          {/* Profile Section */}
          <Meta title="User Profile" />
          <h2 className="text-center text-xl font-semibold mb-3">My Profile</h2>
          <ProfileForm />
        </Col>

        <Col md={9}>
          {/* Orders Section */}
          <h2 className="text-center text-xl font-semibold mb-3">My Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive="sm"
              className="table-sm text-center"
            >
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{addCurrency(order.totalPrice)}</td>
                    <td>
                      {order.isPaid ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaXmark style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaXmark style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm btn-info">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
