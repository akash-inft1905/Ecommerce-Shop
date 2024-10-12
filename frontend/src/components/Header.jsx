import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";
import "./Navbar.css";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());

      navigate("/login");
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      collapseOnSelect
      className="fixed-top z-2"
    >
      <Container style={{ backgroundColor: "#343a40" }}>
        <LinkContainer to="/">
          <Navbar.Brand> Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="search-container">
            <SearchBox />
          </div>
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart style={{ marginRight: "5px" }} />
                Cart
                {cartItems.length > 0 && (
                  <Badge
                    pill
                    bg="warning"
                    style={{ marginLeft: "5px" }}
                    className="text-dark"
                  >
                    <strong>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </strong>
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={`Hello👋, ${userInfo.name}`} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser style={{ marginRight: "5px" }} />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
