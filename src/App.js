import './App.css';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/modals/AddRoomModal';
import InviteMemberModal from './components/modals/InviteMemberModal';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <AppProvider>
            <Routes>
              <Route element={<Login/>} path='/' />
              <Route element={<ChatRoom/>} path='/chatroom' />
            </Routes>
            <AddRoomModal/>
            <InviteMemberModal/>
          </AppProvider>
       
      
      </AuthProvider>
    </BrowserRouter>


  );
}

export default App;
