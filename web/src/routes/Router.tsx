import { BrowserRouter } from 'react-router-dom';
import { useAuthHooks, useCheckSignedInUser } from 'hooks/auth';
import Authenticated from './Authenticated';
import UnAuthenticated from './UnAuthenticated';

function Router() {
  useCheckSignedInUser();
  const { state } = useAuthHooks();
  return (
    <BrowserRouter>
      {state.user ? <Authenticated /> : <UnAuthenticated />}
    </BrowserRouter>
  );
}

export default Router;
