import Loading from 'components/Loading/Loading';
import Authenticated from './Authenticated';
import UnAuthenticated from './UnAuthenticated';
import { useUser } from '../context/auth/auth';

function Router() {
  const { user } = useUser();
  if (user === undefined) return <Loading />;
  return user ? <Authenticated /> : <UnAuthenticated />;
}

export default Router;
