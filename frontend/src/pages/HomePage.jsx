import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useSelector } from "react-redux";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import ServerError from "../components/ServerError";
import Meta from "../components/Meta";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);
  const { search } = useSelector((state) => state.search);

  const { data, isLoading, error } = useGetProductsQuery({
    limit,
    skip,
    search,
  });

  useEffect(() => {
    if (data) {
      setLimit(4);
      setSkip((currentPage - 1) * limit);
      setTotal(data.total);
      setTotalPage(Math.ceil(total / limit));
    }
  }, [currentPage, data, limit, total, search]);

  const pageHandler = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          variant="danger"
          style={{
            textAlign: "center",
            fontSize: "18px",
            padding: "10px 20px",
          }}
        >
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {!search && <ProductCarousel />}
          <Meta />
          <h1
            style={{
              textAlign: "center",
              margin: "20px 0",
              color: "#333",
              fontWeight: "bold",
              fontSize: "2.5rem",
              letterSpacing: "1px",
            }}
          >
            Latest Products
          </h1>
          <Row className="g-4" style={{ marginBottom: "20px" }}>
            {data.products.map((product) => (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                style={{
                  padding: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {totalPage > 1 && !search && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px 0",
              }}
            >
              <Paginate
                currentPage={currentPage}
                totalPage={totalPage}
                pageHandler={pageHandler}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#ffbb33",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
