import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import Cards from "./Cards";
import { useFetchEvents, useEvents } from "./hooks";
import { useUser } from "../auth/hooks";

const EventList = () => {
  const user = useUser();
  const search = useFetchEvents();
  const events = useEvents();

  useEffect(() => {
    if (user) {
      search({
        organiser_id: user.id,
        player_id: user.id,
      });
    }
  }, [user, search]);
  return (
    <PageContainer>
      <Text>PICKUP GAMES</Text>
      {events && <Cards events={events}></Cards>}
    </PageContainer>
  );
};

export default EventList;

const PageContainer = tw.div`
w-full max-w-screen-lg mx-auto flex flex-col h-full py-10 px-2
`;
const Text = tw.h2`
text-2xl capitalize
`;
