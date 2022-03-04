import { useParams, Navigate } from 'react-router-dom';
import { Event } from 'services/EventService';
import Loading from 'components/Loading/Loading';
import useGetEventById from '../hooks/event/useGetEventById';
import EventDetail from '../components/events/EventDetail';

function EventDetials() {
  /* hooks */
  const { id } = useParams();
  const { data, isLoading } = useGetEventById(id as string);

  /* display a loading indicator while fecthing event */
  if (isLoading) return <Loading />;

  /* assigns result from server to varialbe is availble or assigns null */
  const event: Event = data?.data || null;

  /* check if there is an event assigned or redirects user to events page */
  if (!event) {
    return <Navigate to="/events" />;
  }

  return <EventDetail event={event} />;
}

export default EventDetials;
