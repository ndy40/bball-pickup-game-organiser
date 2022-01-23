import React from "react";
import Router from "./routes/Router";
import tw from "tailwind-styled-components";
import Loading from "components/app/Loading";

function App() {
  return (
    <PageContainer>
      <Loading />
      <Router />
    </PageContainer>
  );
}

export default App;

const PageContainer = tw.div`
  flex flex-col bg-white min-h-screen max-w-screen-sm antialiased overflow-x-hidden mx-auto relative
`;
