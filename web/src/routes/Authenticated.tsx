import { Routes, Route, Navigate } from 'react-router-dom';
import Events from 'pages/Events';
import CreateEvent from 'pages/CreateEvent';
import Footer from 'components/Footer/Footer';
import Header from '../components/Header/Header';
import EventDetails from '../pages/EventDetails';

function Authenticated() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden py-14">
      <Header />
      <div className="my-3 h-full w-full flex-1 overflow-scroll px-2 scrollbar-hide">
        <Routes>
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<Navigate to="/events" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Authenticated;
