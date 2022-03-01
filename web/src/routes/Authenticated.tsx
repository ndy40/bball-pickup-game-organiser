import { Routes, Route, Navigate } from 'react-router-dom';
import Events from 'pages/Events';
import CreateEvent from 'pages/CreateEvent';
import Header from '../components/Header/Header';

function Authenticated() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/" element={<Events />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default Authenticated;
