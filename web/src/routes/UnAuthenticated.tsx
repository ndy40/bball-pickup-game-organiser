import { Route, Routes } from 'react-router-dom';
import Login from 'pages/Login';
import Register from 'pages/Register';

function UnAuthenticated() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default UnAuthenticated;
