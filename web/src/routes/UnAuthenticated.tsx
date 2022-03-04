import { Route, Routes, Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import Register from 'pages/Register';

function UnAuthenticated() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default UnAuthenticated;
