import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EventList from "components/events/EventList";
import CreateEvent from "components/events/CreateEvent";
import Header from "../components/app/Header";


const Authenticated = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/" element={<EventList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Authenticated;
