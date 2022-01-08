import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Cards from "./components/Cards";

const EventList = () => {
  return (
    <PageContainer>
      <Text>Events</Text>
      <Cards></Cards>
    </PageContainer>
  );
};

export default EventList;

const PageContainer = styled.div`
  ${tw`w-full max-w-screen-lg mx-auto flex flex-col h-full py-10 px-2`}
`;

const Text = styled.h2`
  ${tw`text-2xl capitalize`}
`;
