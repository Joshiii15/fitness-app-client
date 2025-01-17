import React, { useEffect, useState } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import axios from "axios";

const Workouts = () => {
  const [workouts, setWorkOuts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("access");
      const response = await axios.get(
        "https://fitnessapp-api-ln8u.onrender.com",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWorkOuts(response.data.workouts);
      console.log(response);
    };
    fetchWorkouts();
  }, []);
  return (
    <div>
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        <h1 className="my-5">My Workouts</h1>
        <Row className="d-flex">
          {workouts.map((workout) => (
            <Col className="workout" key={workout._id}>
              <Card
                className="d-flex flex-column mb-2"
                style={{ width: "18rem" }}
              >
                <Card.Body>
                  <Card.Title className="text-center">
                    {workout.name}
                  </Card.Title>
                  <Card.Text className="text-center">
                    Duration: {workout.duration}
                  </Card.Text>
                  <Card.Text className="text-center">
                    Status: {workout.status}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Workouts;
