import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
      <Row>
        <Col className="text-center py-3">
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            Shop &copy; {currentYear}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            All Rights Reserved
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
