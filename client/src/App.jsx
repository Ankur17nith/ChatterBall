import {Routes, Route} from 'react-router-dom'
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/chat' element={<ChatPage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
    </Routes>
    // <h1>ChatterBall</h1>
  );
}

export default App;