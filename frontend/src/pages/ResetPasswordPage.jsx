import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { useParams } from "react-router-dom";
import Message from "../components/Message";

const ResetPasswordPage = () => {
  const { id: userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      const res = await resetPassword({ userId, token, password }).unwrap();
      setPassword("");
      setConfirmPassword("");
      setMessage(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Meta title="Reset Password" />
      <h1 className="text-center text-xl font-semibold mb-4">Reset Password</h1>

      {/* Display message if exists */}
      {message && <Message variant="info">{message}</Message>}

      <Form onSubmit={submitHandler}>
        {/* Password Input */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              id="togglePasswordVisibility"
              className="cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {/* Confirm Password Input */}
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <InputGroup.Text
              onClick={toggleConfirmPasswordVisibility}
              id="toggleConfirmPasswordVisibility"
              className="cursor-pointer"
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {/* Submit Button */}
        <Button
          className="mb-3 w-100 text-lg"
          variant="warning"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordPage;
