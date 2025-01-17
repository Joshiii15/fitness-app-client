import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Card, CardFooter, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import { Notyf } from "notyf";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);
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
      localStorage.setItem("access", response.data.access);
      notyf.success("Logged in successfully");
      setIsLoggedIn(true);
      navigate("/workouts");

      if (!response) {
        console.log("failed to fetch");
      }
    } catch (error) {
      console.error(error.response.data.message);
      notyf.error(error.response.data.message);
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
        <h1 className="my-5 text-center">Log In</h1>
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
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Card.Body>
          <CardFooter>
            {isActive ? (
              <Button
                variant="primary"
                type="submit"
                id="loginBtn"
                className="w-100"
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                id="loginBtn"
                className="w-100"
                disabled
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>

      <p className="text-center mt-3">
        Don't have an account yet?{" Click "}
        <a href="/register">here</a>
        {" to register."}
      </p>
    </>
  );
};

export default Login;
