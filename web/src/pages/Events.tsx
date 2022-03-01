/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import tw from 'tailwind-styled-components';
import EventCards from 'components/events/EventCards';
import { useFetchEvents } from 'hooks/event';
import { useUser } from 'context/auth/auth';
import Loading from 'components/Loading/Loading';

const PageContainer = tw.div`
w-full max-w-screen-lg mx-auto flex flex-col h-full py-10 px-2
`;
const Text = tw.h2`
text-2xl capitalize
`;

function EventList() {
  const { user } = useUser();
  const { mutate, isLoading, data } = useFetchEvents();

  useEffect(() => {
    if (user) {
      mutate({
        organiser_id: user.id,
        player_id: user.id,
      });
    }
  }, [user, mutate]);

  if (isLoading) return <Loading />;

  const events = data?.data ?? [];

  return (
    <PageContainer>
      <Text>PICKUP GAMES</Text>
      {events && <EventCards events={events} />}
    </PageContainer>
  );
}

export default EventList;
