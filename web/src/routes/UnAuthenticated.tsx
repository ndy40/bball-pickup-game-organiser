import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { EventList, Login, Register } from "../features";

const UnAuthenticated = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<EventList />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UnAuthenticated;
