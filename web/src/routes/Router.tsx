/* eslint-disable no-console */
import { BrowserRouter } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import Authenticated from './Authenticated';
import UnAuthenticated from './UnAuthenticated';
import { useUser } from '../context/auth/auth';

function Router() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Loading />;
  return (
    <BrowserRouter>
      {user ? <Authenticated /> : <UnAuthenticated />}
    </BrowserRouter>
  );
}

export default Router;
