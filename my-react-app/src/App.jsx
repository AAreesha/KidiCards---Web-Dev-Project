import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Registration from './pages/RegistrationPage/Registration';
import Login from './pages/LoginPage/login';
import Mainpage from './pages/MainPage/Mainpage';
import Language from './pages/LanguagePage/Language'; 
import EnglishCategoryPage from './pages/LearningPage/English_Learning';
import UrduCategoryPage from './pages/LearningPage/Urdu_Learning';
import AboutUs from './pages/AboutUs/AboutUs';
function App() {


  return (
    <Router>
     
      
      <Routes>
        {/* Define routes and link them to the corresponding components */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/mainpage" element={<Mainpage/>} />
        <Route exact path="/category/:categoryName" element={<Language />} />
        <Route path="/:categoryName/english" element={<EnglishCategoryPage />} />
        <Route path="/:categoryName/urdu" element={<UrduCategoryPage />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
      </Routes>
    </Router>
  );
}

export default App;
