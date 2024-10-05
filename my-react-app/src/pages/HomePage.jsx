import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import cloudImage from "../assets/cloud1.jpg";
import cloudImage2 from "../assets/cloud2.jpg";
import "./HomePage.css";
import logo from "../assets/logo.png";

const HomePage = () => {

  // Function to generate multiple clouds
  const createClouds = () => {
    const cloudContainer = document.querySelector('.cloud-container');
    
    // Create 10 clouds
    for (let i = 0; i < 2; i++) {
      const cloud = document.createElement('img');
      cloud.src = i % 2 === 0 ? cloudImage : cloudImage2; // Alternate between two cloud images
      cloud.classList.add('cloud');
      cloud.style.left = `-350px`;  // Start just outside the left end of the viewport
      cloud.style.top = `${Math.random() * window.innerHeight}px`;  // Random vertical position
      cloud.style.left = `${Math.random() * window.innerWidth}px`;  // Random horizontal position
      cloud.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random animation speed
      cloudContainer.appendChild(cloud);
    }
  };
  const createsmallClouds = () => {
    const cloudContainer = document.querySelector('.cloud-container');
    
    // Create 10 clouds
    for (let i = 0; i < 2; i++) {
      const smolcloud = document.createElement('img');
      smolcloud.src = i % 2 === 0 ? cloudImage : cloudImage2; // Alternate between two cloud images
      smolcloud.classList.add('smolcloud');
      smolcloud.style.left = `-350px`;  // Start just outside the left end of the viewport
      smolcloud.style.top = `${Math.random() * window.innerHeight}px`;  // Random vertical position
      smolcloud.style.left = `${Math.random() * window.innerWidth}px`;  // Random horizontal position
      smolcloud.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random animation speed
      cloudContainer.appendChild(smolcloud);
    }
  };

  
  useEffect(() => {
    createClouds(); // Create clouds on load
    createsmallClouds();
  }, []);

  return (
    <div className='homepage-container'>
      <img src={logo} alt="home-logo" className="home-logo" />
      <Link to="/register">
        <button className="home-register-btn">Sign Up</button>
      </Link>
      <Link to="/login">
        <button className="home-login-btn">Sign In</button>
      </Link>
      
      <div className="cloud-container"></div> {/* Container to hold all clouds */}
    </div>
  );
}

export default HomePage;
