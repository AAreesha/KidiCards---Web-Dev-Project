import { useEffect, useRef, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import cloudImage from "../assets/cloud.png"; 
import cloudImage2 from "../assets/cloud2.png"; 
import logo from "../assets/navbar_logo.png"; 
import mouse from "../assets/mouse.mp3"; 
import fadeInSound from "../assets/entrysound.mp3"; 
import "./HomePage.css"; 


const HomePage = () => {
  const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
  const fadeInSoundRef = useRef(new Audio(fadeInSound)); // Create a new Audio object for fade-in sound
  const navigate = useNavigate(); 
  const [soundPlayed, setSoundPlayed] = useState(false); 

  // Function to handle button click and play mouse click sound
  const handleButtonClick = (path) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Reset sound to start
      clickSoundRef.current.play().then(() => {
        setTimeout(() => {
          navigate(path);
        }, 500);
      }).catch(error => console.error("Sound playback failed", error));
    }
  };

  useEffect(() => {
    // Mouse move event listener to play the fade-in sound only once
    const handleMouseMove = () => {
      if (!soundPlayed && fadeInSoundRef.current) {
        fadeInSoundRef.current.currentTime = 0; // Reset sound to start
        fadeInSoundRef.current.play().then(() => {
          setSoundPlayed(true); // Ensure it only plays once
        }).catch(error => console.error("Fade-in sound playback failed", error));
      }
    };

    // Attach the mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [soundPlayed]); 

  // Function to create clouds
  const createClouds = () => {
    const cloudContainer = document.querySelector('.cloud-container');
    for (let i = 0; i < 1; i++) {
      const cloud = document.createElement('img');
      cloud.src = i % 2 === 0 ? cloudImage : cloudImage2;
      cloud.classList.add('cloud');
      cloud.style.top = `${Math.random() * window.innerHeight}px`;
      cloud.style.left = `${Math.random() * window.innerWidth}px`;
      cloud.style.animationDuration = `${Math.random() * 10 + 5}s`;
      cloudContainer.appendChild(cloud);
    }
  };

  // Function to create small clouds
  const createsmallClouds = () => {
    const cloudContainer = document.querySelector('.cloud-container');
    for (let i = 0; i < 2; i++) {
      const smolcloud = document.createElement('img');
      smolcloud.src = i % 2 === 0 ? cloudImage : cloudImage2;
      smolcloud.classList.add('smolcloud');
      smolcloud.style.top = `${Math.random() * window.innerHeight}px`;
      smolcloud.style.left = `${Math.random() * window.innerWidth}px`;
      smolcloud.style.animationDuration = `${Math.random() * 10 + 5}s`;
      cloudContainer.appendChild(smolcloud);
    }
  };

  // Create clouds on component mount

  useEffect(() => {
    createClouds(); 
    createsmallClouds();
  }, []);

  return (
    <div className='homepage-container'>
      <img src={logo} alt="home-logo" className="home-logo" />
      <button 
        className="home-login-btn" 
        onClick={() => handleButtonClick("/:categoryName/english/flashcards")}
      >
        Flashcard
      </button>
      <button 
        className="home-register-btn" 
        onClick={() => handleButtonClick("/register")}
      >
        Sign Up
      </button>
      <button 
        className="home-login-btn" 
        onClick={() => handleButtonClick("/login")}
      >
        Sign In
      </button>
      <button 
        className="home-login-btn" 
        onClick={() => handleButtonClick("/form")}
      >
        Form
      </button>
     
      <div className="cloud-container"></div> 
    </div>
  );
};

export default HomePage;
