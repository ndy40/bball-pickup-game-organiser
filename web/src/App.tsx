/* eslint-disable import/no-extraneous-dependencies */
import tw from 'tailwind-styled-components';
import Router from './routes/Router';

const PageContainer = tw.div`
  flex flex-col bg-white min-h-screen max-w-screen-sm antialiased overflow-x-hidden mx-auto relative
`;

function App() {
  return (
    <PageContainer>
      <Router />
    </PageContainer>
  );
}

export default App;
