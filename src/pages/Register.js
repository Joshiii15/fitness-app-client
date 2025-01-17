import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Card, CardFooter, Button } from "react-bootstrap";
import { Notyf } from "notyf";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fitnessapp-api-ln8u.onrender.com",
        {
          email,
          password,
        }
      );
      console.log(response);
      notyf.success(`${response.data.message}`);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
      notyf.error(`${error.response.data.message}`);
    }
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    <>
      <Form
        onSubmit={(e) => handleSubmit(e)}
        style={{ maxWidth: "500px" }}
        className="mx-auto"
      >
        <h1 className="my-5 text-center">Register</h1>
        <Card>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Card.Body>

          <CardFooter className="p-3">
            {isActive ? (
              <Button
                variant="primary"
                type="submit"
                id="submitBtn"
                className="w-100"
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="danger"
                type="submit"
                id="submitBtn"
                disabled
                className="w-100"
              >
                Please enter your registration details
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>
      <div className="text-center mt-4">
        <p>
          Already have an account?{" Click "}
          <a href="/login" className="text-primary">
            here
          </a>{" "}
          to log in.
        </p>
      </div>
    </>
  );
};

export default Register;
