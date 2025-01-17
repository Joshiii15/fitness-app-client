import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";

const AddWorkout = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();
  const notyf = new Notyf();

  const addWorkout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const userId = decodedToken.id;
      const response = await axios.post(
        "https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout",
        { userId, name, duration },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.request.status === 200 || response.request.status === 201) {
        notyf.success("Workout added successfully");
        setName("");
        setDuration("");
      }
    } catch (error) {
      console.error(error.response.data.message);
      notyf.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    navigate("/workouts");
  };
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <Form
        onSubmit={addWorkout}
        className="mx-auto"
        style={{ width: "500px" }}
      >
        <h1 className="text-center my-5">Add Workout</h1>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workout name"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex mt-3 justify-content-center">
          <Button
            id="addWorkout"
            variant="success"
            type="submit"
            className="mx-2"
          >
            Add Workout
          </Button>
          <Button variant="danger" className="mx-2" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddWorkout;
