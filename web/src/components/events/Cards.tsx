import React from "react";
import tw from "tailwind-styled-components";
import Card from "./Card";
import { Event } from "../../services/EventService";

interface State {
  events: Event[];
}

const Cards: React.FC<State> = ({ events }) => {
  return (
    <Items>
      {events.map((event, index) => (
        <Card event={event} key={index}></Card>
      ))}
    </Items>
  );
};

export default Cards;

const Items = tw.div`
flex flex-col mt-2 gap-1 text-sm 
`;
