/* eslint-disable import/no-extraneous-dependencies */
import tw from 'tailwind-styled-components';
import { Event } from 'services/EventService';
import { v4 as uuidv4 } from 'uuid';
import EventCard from './EventCard';

const Items = tw.div`
flex flex-col mt-2 gap-1 text-sm
`;
interface ICards {
  events: Event[];
}

export default function EventCards({ events }: ICards) {
  return (
    <Items>
      {events.map((event) => (
        <EventCard event={event} key={uuidv4()} />
      ))}
    </Items>
  );
}
