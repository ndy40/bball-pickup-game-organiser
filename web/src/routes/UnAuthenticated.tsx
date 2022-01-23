import React from "react";
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
=======
import { Navigate, Route, Routes } from "react-router-dom";

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
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
