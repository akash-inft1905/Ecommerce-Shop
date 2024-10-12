import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Registration successful. Welcome!");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
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
        border: "2px",
        borderRadius: "20px",
      }}
    >
      <Meta title={"Register"} />
      <h1
        style={{ textAlign: "center", marginBottom: "20px", color: "#ffbb33" }}
      >
        Register
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
            Name
          </Form.Label>
          <Form.Control
            value={name}
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
            Email address
          </Form.Label>
          <Form.Control
            value={email}
            type="email"
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
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label style={{ fontWeight: "bold", color: "#333" }}>
            Confirm Password
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                flex: 1,
              }}
            />
            <InputGroup.Text
              onClick={toggleConfirmPasswordVisibility}
              id="toggleConfirmPasswordVisibility"
              style={{
                cursor: "pointer",
                backgroundColor: "#ffbb33",
                border: "none",
              }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
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
          Register
        </Button>
      </Form>
      <Row>
        <Col style={{ textAlign: "center" }}>
          Already have an account?
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="mx-2"
            style={{
              color: "#ffbb33",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
