import Avatar from '@mui/material/Avatar';
import './NavBar.css'; // Link to the CSS file for styling
import Logo from "../../assets/navbar_logo.png";
import { auth } from '../../firebase';
import { onSnapshot, doc } from "firebase/firestore"; // Real-time Firestore listener
import db from '../../firebase'; // Firestore configuration
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Import avatar images
import ProfileIcon from "../../assets/girl1.png";
import Profileicon from "../../assets/girl1.png";
import Profileicon1 from "../../assets/boy.png";
import Profileicon2 from "../../assets/boy2.png";
import Profileicon3 from "../../assets/girl.png";

// Map avatar IDs to their corresponding image sources
const avatarMap = {
  1: Profileicon,
  2: Profileicon1,
  3: Profileicon2,
  4: Profileicon3,
};

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(null); // Store the avatar src here
  const [username, setUsername] = useState(''); // Store the username here
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Real-time listener to fetch avatarId and username from Firestore when user is authenticated
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        // Set up real-time listener for Firestore updates on avatarId and username
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const avatarId = userData.avatarId;
            const fetchedUsername = userData.username; // Fetch the username

            // Set the avatar src based on the avatarId
            if (avatarId && avatarMap[avatarId]) {
              setAvatarSrc(avatarMap[avatarId]);
            } else {
              setAvatarSrc(null); // Fallback if no avatarId is found
            }

            // Set the username
            setUsername(fetchedUsername || ''); // Fallback to empty string if no username
          }
        });

        return () => unsubscribe(); // Cleanup Firestore listener on unmount
      } else {
        setUser(null);
      }
    });

    return () => listen(); // Cleanup auth listener on unmount
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        setUser(null);
        navigate("/"); // Redirect to homepage after sign-out
      })
      .catch((error) => console.log("Error signing out:", error));
  };

  // Toggle dropdown on icon click
  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo-link">
          <img src={Logo} alt="KidiCards Logo" className="navbar-logo" />
        </a>
      </div>

      <div className="navbar-icons">
        {user?.email === 'abc@gmail.com' && (
          <a href="/form" className="navbar-link">Add Category</a>
        )}
        <a href="/mainpage" className="navbar-link">Main Page</a>
        <a href="/aboutus" className="navbar-link">About Us</a>

        {/* Profile Icon */}
        <div className="profile-icon-wrapper" ref={dropdownRef}>
          <Avatar
            alt="Profile"
            src={avatarSrc || ProfileIcon} // Display avatarSrc or fallback to default
            className="navbar-profile-icon"
            onClick={handleToggleDropdown}
          />

          {/* Dropdown menu */}
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <Avatar
                alt="Profile"
                src={avatarSrc || ProfileIcon} // Display avatarSrc in dropdown as well
                className="navbar-dropdown-icon"
              />
              {user && <li className="navbar-user-email">Hi {username}!</li>}
              <li><a onClick={() => navigate('/score')}>View Score</a></li>
              <li><a onClick={() => navigate('/profile')}>Change Avatar</a></li>
              {user && (
                <li><button onClick={handleSignOut} className="sign-out-button">Sign Out</button></li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
