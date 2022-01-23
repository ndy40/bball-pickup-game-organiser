import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "components/auth/Login";
import Register from "components/auth/Register";

const UnAuthenticated = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default UnAuthenticated;
