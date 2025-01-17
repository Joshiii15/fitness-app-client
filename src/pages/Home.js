import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row className="d-flex align-items-center" style={{ height: "80vh" }}>
        <Col className="text-center">
          <h1>Welcome to Zuitt Workouts</h1>
          <p className="fs-5">Your workout tracker</p>
          <span>
            <a href="/login">Log in</a>
            {" or "}
            <a href="/register">Register</a>
            {" to get started"}
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
