import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const AppNavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="navbar bg-body-tertiary" class="navbar">
        <Container>
          <Navbar.Brand>Zuitt Workouts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <Nav.Link as={NavLink} to="/workouts" exact="true">
                    Workouts
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/addWorkout">
                    Add Workout
                  </Nav.Link>
                  <Nav.Link
                    as="span"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Log In
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavBar;
