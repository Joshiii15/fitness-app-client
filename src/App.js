import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workouts from "./pages/Workouts";
import AddWorkout from "./pages/AddWorkout";
import { UserProvider } from "./UserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on mount and update isLoggedIn
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <UserProvider value={{ isLoggedIn, setIsLoggedIn }}>
        <Router>
          <AppNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/addWorkout" element={<AddWorkout />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
