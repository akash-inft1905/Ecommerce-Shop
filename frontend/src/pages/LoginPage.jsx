import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password, remember }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Meta title={"Sign In"} />
      <h1
        style={{ textAlign: "center", marginBottom: "20px", color: "#ffbb33" }}
      >
        Sign In
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
            Password
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                flex: 1,
              }}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              id="togglePasswordVisibility"
              style={{
                cursor: "pointer",
                backgroundColor: "#ffbb33",
                border: "none",
              }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="checkbox">
              <Form.Check
                type="checkbox"
                label="Keep me signed in."
                checked={remember}
                onChange={() => setRemember(!remember)}
                style={{ color: "#333" }}
              />
            </Form.Group>
          </Col>
          <Col className="text-end">
            <Link
              to={"/reset-password"}
              className="mx-2"
              style={{
                color: "#ffbb33",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Forgot password?
            </Link>
          </Col>
        </Row>
        <Button
          className="mb-3 w-100"
          variant="warning"
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: "#ffbb33",
            border: "none",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Sign In
        </Button>
      </Form>
      <Row>
        <Col style={{ textAlign: "center" }}>
          New Customer?
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="mx-2"
            style={{
              color: "#ffbb33",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
