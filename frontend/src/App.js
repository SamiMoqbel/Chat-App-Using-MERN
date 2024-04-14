import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Sidebar from './components/sidebar/Sidebar';
import MessageContainer from './components/messages/MessageContainer';

function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center '>
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default App;
