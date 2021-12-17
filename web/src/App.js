
import Loading from './components/Loading';
import { useAuth } from './context/AuthContex';
import Authenticated from './routes/Authenticated';
import UnAuthenticed from './routes/UnAuthenticated';



function App() {
  const {user,isLoading} = useAuth()
 const routes = ()=> {
   if(!isLoading){
     if(user){
       return <Authenticated/>
     }else{
       return <UnAuthenticed/>
     }
   }
 }


 console.log(isLoading)



 return <>
 {isLoading ? <Loading/> : routes()}
 </>



}

export default App;
