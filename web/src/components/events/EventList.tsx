import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
<<<<<<< HEAD
import Cards from "./Cards";
import { useFetchEvents, useEvents } from "./hooks";
import { useUser } from "../auth/hooks";

const EventList = () => {
  const user = useUser();
=======

import Cards from "./Cards";
import { useFetchEvents, useEvents } from "./hooks/use-events";
import { useAuthHooks } from "../auth/hooks/useAuthHooks";

const EventList = () => {
  const {
    state: { user },
  } = useAuthHooks();
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
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
<<<<<<< HEAD

=======
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
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
<<<<<<< HEAD
const Text = tw.h2`
text-2xl capitalize
`;
=======

const Text = tw.h2`
text-2xl capitalize
`;

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
