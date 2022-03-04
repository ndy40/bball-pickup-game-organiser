/* eslint-disable no-console */
import moment from 'moment';
import { Event } from 'services/EventService';
import { Link } from 'react-router-dom';
import useLeaveEvent from 'hooks/event/useLeaveEvent';
import {
  LocationMarkerIcon,
  CashIcon,
  UserIcon,
} from '@heroicons/react/outline';
import useGetEventState from 'hooks/event/useGetEventState';
import useJoinEvent from '../../hooks/event/useJoinEvent';

interface ICard {
  event: Event;
}

export default function EventCard({ event }: ICard) {
  /* hooks */
  const { mutate: joinEvent } = useJoinEvent();
  const { mutate: leaveEvent } = useLeaveEvent();
  const { availableSlots, eventTimeColor, canJoinEvent, isAttending } =
    useGetEventState(event);

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-lg ">
      <div
        className={`flex flex-col items-center justify-center space-y-1 ${eventTimeColor} p-4  text-2xl italic text-white`}
      >
        <span className=" font-bold">
          {moment(event.session_date).format('dddd')}
        </span>
        <div>
          <span className="inline-block font-bold">
            {moment(event.session_date).format('Do')}
          </span>
          <span className="ml-2 inline-block font-bold">
            {moment(event.session_date).format('MMM')}
          </span>
        </div>
        <span className="text-md">
          {moment(event.session_date).format('hh:mm A')}
        </span>
      </div>
      <div>
        <div className="flex flex-col px-2 text-sm">
          <div className="mb-2">
            <h2 className="text-xl font-bold capitalize tracking-wide">
              {event.title}
            </h2>
            <p>by {event.organiser_name}</p>
          </div>
          <div className="mb-1 flex items-center space-x-4">
            <div className="icon">
              <LocationMarkerIcon className="w-6" />
            </div>
            <div>
              <p className="text-md font-medium text-gray-800">{event.venue}</p>
            </div>
          </div>
          <div className="mb-1 flex items-center space-x-4">
            <div className="icon">
              <CashIcon className="w-6" />
            </div>
            <div>
              <p className="text-md font-medium text-gray-800">{event.cost}</p>
            </div>
          </div>
          <div className="mb-1 flex items-center space-x-4 overflow-hidden">
            <div className="icon">
              <UserIcon className="w-6" />
            </div>
            <div>
              <span>{availableSlots}</span>
              <span className="text-md ml-1">slots available</span>
            </div>
          </div>
          <div className="mb-1 flex items-center space-x-4 overflow-hidden">
            <div className="text-md pl-1">
              {event.players.map((player) => (
                <img
                  src={player.avatar}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  alt=""
                />
              ))}
            </div>
            <div>
              <span>{event.players.length}</span>
              <span className="ml-1">attending</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between  space-x-4 bg-gray-50 py-2 px-1">
          <Link
            to={`${event.id}`}
            type="button"
            className="px-42 rounded py-2  px-2  text-gray-600 hover:text-blue-400 hover:underline "
          >
            View
          </Link>
          {canJoinEvent &&
            (isAttending ? (
              <button
                type="button"
                className="rounded bg-red-500 px-2 py-2 font-bold  text-white"
                onClick={() => leaveEvent(event.id)}
              >
                Leave Event
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary rounded px-2 py-2 font-bold  text-white"
                onClick={() => joinEvent(event.id)}
              >
                Join Event
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
