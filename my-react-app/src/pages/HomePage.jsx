import {  useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import cloudImage from "../assets/icon.png";
import { useRef } from 'react';
import "./HomePage.css";
import logo from "../assets/logo.png";
import mouse from "../assets/mouse.mp3";

const HomePage = () => {
  const clickSoundRef = useRef(null); // Ref for the button click sound
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleButtonClick = (path) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play().then(() => {
        // Delay navigation for a brief moment to allow sound to play
        setTimeout(() => {
          navigate(path);
        }, 1200); // Adjust the duration as necessary (in milliseconds)
      }).catch(error => console.error("Sound playback failed", error));
    }
  };

  return (
    <div className='homepage-container'>
      <img src={logo} alt="home-logo" className="home-logo" />
      <audio ref={clickSoundRef} src={mouse}></audio> {/* Hidden audio for button clicks */}
      <button 
        className="home-register-btn" 
        onClick={() => handleButtonClick("/register")} // Pass path for Sign Up
      >
        Sign Up
      </button>
      <button 
        className="home-login-btn" 
        onClick={() => handleButtonClick("/login")} // Pass path for Sign In
      >
        Sign In
      </button>
      <img src={cloudImage} alt="Cloud" className="cloud" />
    </div>
  );
};

export default HomePage;
