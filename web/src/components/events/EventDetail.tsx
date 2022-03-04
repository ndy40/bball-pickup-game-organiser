import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import moment from 'moment';
import {
  ShareIcon,
  CalendarIcon,
  LocationMarkerIcon,
  CashIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import useDeleteEvent from 'hooks/event/useDeleteEvent';
import useJoinEvent from 'hooks/event/useJoinEvent';
import useLeaveEvent from 'hooks/event/useLeaveEvent';
import { Event } from 'services/EventService';
import useGetEventState from 'hooks/event/useGetEventState';
import { v4 as uuid } from 'uuid';

export default function EventDetail({ event }: { event: Event }) {
  /* hooks */
  const { mutate: leave } = useLeaveEvent();
  const { mutate: join } = useJoinEvent();
  const { mutate: remove } = useDeleteEvent();
  const { availableSlots, canJoinEvent, isAttending, isOwner } =
    useGetEventState(event);

  return (
    <div className="flex flex-1 flex-col bg-gray-50 ">
      <div className="border-2 border-gray-100 shadow-md ">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className=" py-2 text-lg font-bold">{event.title}</h2>
            <span className="text-md">by {event.organiser_name}</span>
          </div>

          <CopyToClipboard
            text={event.invite_link}
            onCopy={() => toast.success('link copied to clipboard')}
          >
            <button
              type="button"
              className="text-green px-4 py-2 text-gray-600"
            >
              <div className="icon">
                <ShareIcon className="w-6" />
              </div>
            </button>
          </CopyToClipboard>
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <div className="icon">
            <CalendarIcon className="w-6" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-800">
              <span>
                {moment(event.session_date).format('ddd, MMM  Do, YYYY')}
              </span>
            </p>
            <p className="text-md text-gray-600">
              <span>{moment(event.session_date).format('hh:mm A')}</span>
            </p>
          </div>
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <div className="icon">
            <LocationMarkerIcon className="w-6" />
          </div>
          <div>
            <p className="text-md font-medium text-gray-800">{event.venue}</p>
          </div>
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <div className="icon">
            <CashIcon className="w-6" />
          </div>
          <div>
            <p className="text-md font-medium text-gray-800">{event.cost}</p>
          </div>
        </div>
        <div className="mb-4 flex items-center space-x-4 overflow-hidden">
          <div className="text-md pl-1">
            {event.players.map((player) => (
              <img
                src={player.avatar}
                key={uuid()}
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
        <div className="mb-4 flex items-center space-x-4 overflow-hidden">
          <div className="icon">
            <UserIcon className="w-6" />
          </div>
          <div>
            <span>{availableSlots}</span>
            <span className="text-md ml-1">slots available</span>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-lg font-bold">Note</h3>
          <p className="text-md mt-2 font-light  tracking-normal">
            {event.notes}
          </p>
        </div>

        {/* display leave event or join event depending on state of canJoinEvent */}
        {canJoinEvent && !isAttending ? (
          <button
            type="button"
            onClick={() => join(event?.id)}
            className="w-full rounded-full bg-emerald-600 px-4 py-2 text-lg shadow-md hover:bg-emerald-700 "
          >
            Join Event
          </button>
        ) : (
          <button
            type="button"
            onClick={() => leave(event?.id)}
            className="mb-4 w-full rounded-full border-2 border-red-500 py-4 px-4 text-lg font-bold text-red-500 shadow-md hover:text-opacity-90 hover:shadow-md"
          >
            Leave Event
          </button>
        )}

        {/* display delete and recreate event depending on state of owner */}
        {isOwner && (
          <>
            <Link
              to="/create"
              state={{ event }}
              type="button"
              className="mb-4 w-full rounded-full border-2 border-gray-600 bg-gray-600 py-4 px-4 text-center text-lg font-bold text-white shadow-md hover:text-opacity-90 hover:shadow-md"
            >
              Recreate Event
            </Link>
            <button
              type="button"
              onClick={() => remove(event?.id)}
              className="w-full rounded-full border-2 border-red-600 bg-red-600 py-4 px-4 text-center text-lg font-bold text-white shadow-md hover:text-opacity-90 hover:shadow-md"
            >
              Delete Event
            </button>
          </>
        )}
      </div>
    </div>
  );
}
