import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Router from "./routes/Router";

function App() {
  return (
    <PageContainer>
      <Router />
    </PageContainer>
  );
}

export default App;

const PageContainer = styled.div`
  ${tw` flex flex-col bg-white min-h-screen w-full `}
`;
