import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import cloudImage from "../assets/cloud.png";
import cloudImage2 from "../assets/cloud2.png";
import "./HomePage.css";
import logo from "../assets/navbar_logo.png";

const HomePage = () => {

  // Function to generate multiple animated clouds
  const createClouds = () => {
    const cloudContainer = document.querySelector('.cloud-container');
    
    // Create 2 animated clouds
    for (let i = 0; i < 1; i++) {
      const cloud = document.createElement('img');
      cloud.src = i % 2 === 0 ? cloudImage : cloudImage2; // Alternate between two cloud images
      cloud.classList.add('cloud');  // Add cloud class for animation
      cloud.style.top = `${Math.random() * window.innerHeight}px`;  // Random vertical position
      cloud.style.left = `${Math.random() * window.innerWidth}px`;  // Random horizontal position
      cloud.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random animation speed
      cloudContainer.appendChild(cloud);
    }
  };

  // Function to generate smaller animated clouds
  const createsmallClouds = () => {
    const cloudContainer = document.querySelector('.cloud-container');
    
    // Create 2 small clouds
    for (let i = 0; i < 2; i++) {
      const smolcloud = document.createElement('img');
      smolcloud.src = i % 2 === 0 ? cloudImage : cloudImage2; // Alternate between two cloud images
      smolcloud.classList.add('smolcloud');  // Add smolcloud class for animation
      smolcloud.style.top = `${Math.random() * window.innerHeight}px`;  // Random vertical position
      smolcloud.style.left = `${Math.random() * window.innerWidth}px`;  // Random horizontal position
      smolcloud.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random animation speed
      cloudContainer.appendChild(smolcloud);
    }
  };

  // Function to generate fixed-position clouds
  const createFixedClouds = () => {
    const cloudContainer = document.querySelector('.cloud-container');

    // First fixed cloud
    const fixedCloud1 = document.createElement('img');
    fixedCloud1.src = cloudImage;
    fixedCloud1.classList.add('fixed-cloud', 'fixed-cloud1');
    cloudContainer.appendChild(fixedCloud1);

    // Second fixed cloud
    const fixedCloud2 = document.createElement('img');
    fixedCloud2.src = cloudImage2;
    fixedCloud2.classList.add('fixed-cloud', 'fixed-cloud2');
    cloudContainer.appendChild(fixedCloud2);

    // Third fixed cloud
    const fixedCloud3 = document.createElement('img');
    fixedCloud3.src = cloudImage;
    fixedCloud3.classList.add('fixed-cloud', 'fixed-cloud3');
    cloudContainer.appendChild(fixedCloud3);
  };

  useEffect(() => {
    createClouds();        // Create animated clouds on load
    createsmallClouds();    // Create smaller animated clouds on load
    // createFixedClouds();    // Create fixed-position clouds on load
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
};

export default HomePage;
