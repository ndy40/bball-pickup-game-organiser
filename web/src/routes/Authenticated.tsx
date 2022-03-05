import { Routes, Route, Navigate } from 'react-router-dom';
import Events from 'pages/Events';
import CreateEvent from 'pages/CreateEvent';
import Footer from 'components/Footer/Footer';
import Header from '../components/Header/Header';
import EventDetails from '../pages/EventDetails';

function Authenticated() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<Navigate to="/events" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default Authenticated;
