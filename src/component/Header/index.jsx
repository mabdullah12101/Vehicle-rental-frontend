import React from "react";
import Logo from "../Logo";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./index.css";
import people from "../../assets/img/default-profile.png";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../stores/actions/user";

export default function Header() {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem("token");

  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await axios.post("auth/logout");
      localStorage.clear();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfile = (e) => {
    e.preventDefault();
    navigate(`/profile/${id}`);
  };
  useEffect(() => {
    dispatch(getUserById(id));
  }, []);
  console.log(user);
  return (
    <Navbar bg="white" expand="lg" className="font-nunito py-4">
      <Container>
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-4 me-5">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/vehicle-type">Vehicle Type</Nav.Link>
            <Nav.Link href="">History</Nav.Link>
            <Nav.Link href="">About</Nav.Link>
            <Nav.Link href=""></Nav.Link>
          </Nav>
          {isLogin ? (
            <div className="d-flex align-items-center justify-content-center">
              <div>
                {user?.data.data?.name ? user.data.data.name : "no name"}
              </div>
              <NavDropdown
                title={
                  <img
                    src={
                      user.data.data?.image
                        ? `https://res.cloudinary.com/dtjeegwiz/image/upload/v1667500751/AutoRent/user/${user.data.data.image}`
                        : people
                    }
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/profile" onClick={handleProfile}>
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <div className="d-flex gap-3 justify-content-center">
              <button
                className="button-navbar bg-white border-yellow"
                onClick={() => navigate("/signin")}
              >
                Login
              </button>
              <button
                className="button-navbar background-yellow border-0"
                onClick={() => navigate("/signup")}
              >
                Register
              </button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
