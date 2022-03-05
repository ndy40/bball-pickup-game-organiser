import { Event } from 'services/EventService';
import { v4 as uuidv4 } from 'uuid';
import EventCard from './EventCard';

interface ICards {
  events: Event[];
  title: string;
}

export default function EventCards({ events, title }: ICards) {
  return (
    <div className="flex flex-col divide-y-2  text-sm">
      <h2 className="mb-1 py-4  text-3xl font-bold capitalize text-gray-900">
        {events.length}
        <span className="ml-2">Events</span>
      </h2>
      {events.map((event) => (
        <EventCard event={event} key={uuidv4()} />
      ))}
    </div>
  );
}
