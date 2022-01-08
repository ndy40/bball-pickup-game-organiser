import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Card from "./Card";

const Cards = () => {
  return (
    <Items>
      <Card></Card>
    </Items>
  );
};

export default Cards;

const Items = styled.div`
  ${tw`flex flex-col mt-2 gap-7 text-sm `}
`;
