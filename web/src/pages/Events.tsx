/* eslint-disable import/no-extraneous-dependencies */
import EventCards from 'components/events/EventCards';
import { useFetchEvents } from 'hooks/event';
import { useUser } from 'context/auth/auth';
import Loading from 'components/Loading/Loading';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { sortEventByClosestDate } from '../utilities/event';

const tabs = [
  {
    name: 'Today',
    value: 0,
  },
  {
    name: 'Upcoming',
    value: 1,
  },
  {
    name: 'Previous',
    value: 2,
  },
];

function EventList() {
  const [active, setActive] = useState(0);
  const { user } = useUser();
  const { data, isLoading } = useFetchEvents({
    organiser_id: user?.id,
    player_id: user?.id,
  });

  if (isLoading) return <Loading />;

  const { upcoming, previous, today } = data() || {
    upcoming: [],
    previous: [],
    today: [],
  };

  return (
    <div className="flex flex-1 flex-col py-4">
      <div className="grid list-none grid-cols-3">
        {tabs.map((tab) => (
          <button
            type="button"
            key={uuid()}
            className={`cursor-pointer ${
              active === tab.value && 'border-red-400'
            } border-b-2 py-2  text-center text-xs font-medium uppercase leading-tight hover:bg-gray-100`}
            onClick={() => setActive(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mb-2">
        {active === 0 && (
          <EventCards title="Today" events={sortEventByClosestDate(today)} />
        )}
        {active === 1 && (
          <EventCards
            title="Upcoming"
            events={sortEventByClosestDate(upcoming)}
          />
        )}
        {active === 2 && <EventCards title="Previous" events={previous} />}
      </div>
    </div>
  );
}

export default EventList;
