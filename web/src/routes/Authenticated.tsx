import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { EventList } from "../features";

const Authenticated = () => (
  <Routes>
    <Route path="/" element={<EventList />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default Authenticated;
