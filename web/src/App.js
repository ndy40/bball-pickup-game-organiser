
import Loading from './components/Loading';
import { useAuth } from './context/AuthContex';
import Authenticated from './routes/Authenticated';
import UnAuthenticed from './routes/UnAuthenticated';

function App() {
  const {user} = useAuth()
 const routes = ()=> user ?  <Authenticated/>: <UnAuthenticed/>
  


  return  !user ? <Loading/>: routes() 
}

export default App;
