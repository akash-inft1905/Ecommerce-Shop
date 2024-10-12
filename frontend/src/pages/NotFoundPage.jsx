import React from "react";
import { Container, Col, Button } from "react-bootstrap";
import Meta from "../components/Meta";

const NotFoundPage = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Meta title="404 Not Found" />
      <Col className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Oops!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Button href="/" variant="primary" className="mt-3">
          Go Home
        </Button>
      </Col>
    </Container>
  );
};

export default NotFoundPage;
