import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BiChevronsRight } from "react-icons/bi";

const Card = () => {
  return (
    <Item>
      <Container>
        <DateContainer>
          <DateContent>
            <span>Today</span>
            <span>17.00</span>
          </DateContent>
        </DateContainer>
        <EventDetails>
          <EventTitle>Upper Court Voley</EventTitle>
          <EventCreator>Creator: mfonobong Ekott</EventCreator>

          <EventDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore corporis modi
            architecto suscipit eligendi illum neque itaque odio iusto? Esse officiis et amet quas
            dignissimos libero, sit reiciendis praesentium atque.
          </EventDescription>
          <EventFooter>
            <Registered>
              Total Registered:
              <Badge className="bg-red-500">4</Badge>
            </Registered>
            <Required>
              Required:
              <Badge className="bg-gray-900">9</Badge>
            </Required>
          </EventFooter>
        </EventDetails>
        <EventLink>
          <BiChevronsRight />
        </EventLink>
      </Container>
    </Item>
  );
};

export default Card;

const Item = styled.div`
  ${tw`bg-gray-100 flex items-center  rounded-sm shadow-sm rounded hover:shadow `}
`;

const Container = styled.div`
  ${tw`flex`}
`;

const DateContainer = styled.div`
  ${tw`p-2  `}
`;

const DateContent = styled.div`
  ${tw`bg-white h-full w-full flex flex-col items-center justify-center px-5 text-lg font-semibold`}
`;

const Badge = styled.div`

  ${tw`inline-flex items-center justify-center px-2 py-1  text-xs font-bold  leading-none text-red-100  rounded-full ml-2`}}
`;

const EventDetails = styled.div`
  ${tw`font-bold px-2 py-3 h-full`}
`;

const EventTitle = styled.div`
  ${tw`text-gray-700 text-lg  font-bold tracking-wider`}
`;

const EventCreator = styled.div`
  ${tw`text-blue-400 font-medium capitalize text-xs `}
`;

const EventDescription = styled.div`
  ${tw`text-gray-700 font-normal text-xs mt-1  line-clamp-2 `}
`;
const EventFooter = styled.div`
  ${tw`mt-2 flex flex-col space-y-1`}
`;

const Registered = styled.div`
  ${tw`
  font-medium text-gray-700 flex items-center`}
`;

const Required = styled.div`
  ${tw`font-medium text-gray-700 flex items-center`}
`;

const EventLink = styled.div`
  ${tw`bg-gray-300  text-white text-xl flex justify-center items-center hover:bg-gray-400 cursor-pointer rounded-r`}
`;
