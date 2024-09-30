import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Registration from './pages/RegistrationPage/Registration';
import Login from './pages/LoginPage/login';
import Mainpage from './pages/MainPage/Mainpage';

function App() {


  return (
    <Router>
     
      
      <Routes>
        {/* Define routes and link them to the corresponding components */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/mainpage" element={<Mainpage/>} />
      </Routes>
    </Router>
  );
}

export default App;
