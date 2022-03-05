/* eslint-disable no-console */
import moment from 'moment';
import { Event } from 'services/EventService';
import { Link } from 'react-router-dom';

interface ICard {
  event: Event;
}

export default function EventCard({ event }: ICard) {
  return (
    <Link to={`${event.id}`} className="grid  grid-cols-3 py-4">
      <div className="col-span-2 ">
        {/* Date */}
        <p className="block text-lg font-bold uppercase text-stone-700">
          {moment(new Date(event.session_date)).format('ddd, MMM D · hh:mm A')}
        </p>
        {/* title */}
        <h2 className="block text-lg font-bold capitalize text-gray-900">
          {event.title}
        </h2>
        {/* title */}
        <h3 className="block text-sm font-bold capitalize text-gray-600">
          {event.venue}
        </h3>
        {/* Number of people goind */}
        <p className="block text-sm font-bold  text-gray-600">
          {event.players.length} going
        </p>
      </div>
      <div className="flex items-center justify-center  text-xl font-bold tracking-wide text-gray-900">
        £{event.cost}
      </div>
    </Link>
  );
}
