import { useNavigate } from 'react-router-dom';
import './App.css'
import { Button } from "./components/ui/button"
import Signup from './pages/Register'
import { UserAuth } from './services/AuthContext';

function App() {
  const {session, signOut, signInUser} = UserAuth();
  const navigate = useNavigate();

  console.log(session);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try{
      await signOut();
      navigate('/signin');
    }catch(error){
      console.error('error signing out', error);
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try{
      navigate('/signin');
    }catch(error){
      console.error('error navigating to sign in', error);
    }
  }

  return (
    <>

      <div >Homepage</div>
      <h3>Welcome {session?.user?.email}</h3>
      <Button onClick={session ? handleSignOut : handleSignIn}>
        {session ? 'Sign Out' : 'Sign In'}
      </Button>
      

    </>
  )
}

export default App
