import React, { useEffect, useState } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Workouts = () => {
  const [workouts, setWorkOuts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("access");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.get(
        "https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts",
        // "http://localhost:4000/workouts/getMyWorkouts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allWorkouts = response.data.workouts;
      const userWorkouts = allWorkouts.filter(
        (workout) => workout.userId === userId
      );
      if (userWorkouts.length === 0) {
        setMessage("No workouts yet");
      } else {
        setWorkOuts(userWorkouts);
      }
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
          {workouts.length > 0 ? (
            workouts.map((workout) => (
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
            ))
          ) : (
            <h5 className="text-center">{message}</h5>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Workouts;
