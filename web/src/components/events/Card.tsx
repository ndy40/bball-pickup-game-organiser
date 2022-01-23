import React from "react";
import tw from "tailwind-styled-components";
import moment from "moment";

import { Event } from "../../services/EventService";
interface State {
  event: Event;
}

const Card: React.FC<State> = ({ event }) => {
  return (
    <Item>
      <Container>
        <DateContainer>
          <DateContent>
            <span>{moment(event.session_date).format("DD/MM/YY")}</span>
            <span>{moment(event.session_date).format("hh:mm a")}</span>
          </DateContent>
        </DateContainer>
        <EventDetails>
          <div className="flex flex-col">
            <h1 className="text-gray-700 text-lg capitalize">{event.title}</h1>
            <div className="details container flex flex-col gap-x-6 text-gray-500 space-y-1">
              <p>{event.venue}</p>
              <p>Cost/Player: ${event.cost}</p>
              <p>
                Players:{" "}
                <span className="text-gray-100 rounded-full py-0.5 px-2 bg-gray-500">
                  {event.max_players}
                </span>
              </p>
              <p>
                Attending:{" "}
                <span className="text-gray-100 rounded-full py-0.5 px-2 bg-gray-500">
                  {event.players.length}
                </span>
              </p>
            </div>
            <div className="flex w-full space-x-2 mt-2">
              <button className="w-6/12 p-1 bg-yellow-600 text-white">View</button>
              <button className="w-6/12 p-1 bg-emerald-600 text-white">Join</button>
            </div>
          </div>
        </EventDetails>
      </Container>
    </Item>
  );
};

export default Card;

const Item = tw.div`
bg-gray-100 flex items-center  rounded-sm shadow-sm rounded hover:shadow 
`;

const Container = tw.div`
  flex w-full
`;

const DateContainer = tw.div`
p-2  
`;

const DateContent = tw.div`
bg-white h-full w-full flex flex-col items-center justify-center px-5 text-lg font-semibold
`;

const EventDetails = tw.div`
font-bold px-2 py-3 h-full flex-1
`;
