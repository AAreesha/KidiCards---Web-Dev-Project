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
// import AuthDetails from './Auth/AuthDetails';
import Form from './pages/AdminForm/Form'
import Flashcard from './pages/Learningmode/mode'
import Test from './pages/Testingmode/testmode'
import ProfileIcon from './pages/ProfileIcon/ProfileIcon';
import Match from './pages/Matching/matchmode';
import Score from './pages/Scores/scores';

function App() {


  return (
    <Router>
    
      
      <Routes>
        {/* Define routes and link them to the corresponding components */}
        
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/mainpage" element={<Mainpage/>} />
        <Route exact path="/category/:categoryId" element={<Language />} />
        <Route path="/:categoryName/english" element={<EnglishCategoryPage />} />
        <Route path="/:categoryName/urdu" element={<UrduCategoryPage />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/:categoryName/:language/flashcards" element={<Flashcard />} /> 
        <Route path="/:categoryName/:language/testing" element={<Test />} /> 
        <Route path="/:categoryName/:language/matching" element={<Match />} />
        <Route path ="/form" element={<Form/>}/>
        <Route path ="/score" element={<Score/>}/>
        <Route path ="/profile" element={<ProfileIcon/>}/>
       
      </Routes>
      {/* <AuthDetails/> */}
    </Router>
  );
}

export default App;
