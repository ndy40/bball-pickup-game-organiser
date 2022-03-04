/* eslint-disable no-console */
import moment from 'moment';
import { Event } from 'services/EventService';
import { Link } from 'react-router-dom';
import useLeaveEvent from 'hooks/event/useLeaveEvent';
import useJoinEvent from '../../hooks/event/useJoinEvent';
import { useUser } from '../../context/auth/auth';

interface ICard {
  event: Event;
}

export default function EventCard({ event }: ICard) {
  const { user } = useUser();
  const { mutate: joinEvent } = useJoinEvent();
  const { mutate: leaveEvent } = useLeaveEvent();
  const slots = event.max_players - event.players.length;
  const days = moment(Date.now()).diff(
    moment(new Date(event.session_date)),
    'day',
  );
  const eventState = () => {
    if (days === 0) {
      return 'bg-yellow-600';
    }
    if (days > 0) {
      return 'bg-red-600 ';
    }
    if (days < 0) {
      return 'bg-green-600';
    }
    return '';
  };
  const canJoinEvent = slots !== 0 && days <= 0;
  const isAttending = event.players.find(
    (player) => player.player_id === user?.id,
  );
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-lg ">
      <div
        className={`flex flex-col items-center justify-center space-y-1 ${eventState()} p-4  text-2xl italic text-white`}
      >
        <span className=" font-bold">
          {moment(event.session_date).format('Do')}
        </span>
        <span className="font-bold">
          {moment(event.session_date).format('MMM')}
        </span>
        <span className="text-md">
          {moment(event.session_date).format('HH:mm')}
        </span>
      </div>
      <div>
        <div className="flex flex-col px-2 text-sm">
          <h2 className="font-bold capitalize">{event.title}</h2>
          <h3>
            host:
            <span className="ml-1 italic">{event.organiser_name}</span>
          </h3>
          <h2>
            Cost:
            <span className="ml-1">{event.cost}</span>
          </h2>
          <p>
            Number of players:
            <span className="ml-1">{event.max_players}</span>
          </p>
          <p>
            Available slot:
            <span className="ml-1">{slots}</span>
          </p>
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
                className="btn-primary rounded px-2 py-2 font-bold  text-white"
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
