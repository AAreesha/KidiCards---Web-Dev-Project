import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import './NavBar.css'; // Link to the CSS file for styling
import Logo from "../../assets/navbar_logo.png"
import ProfileIcon from "../../assets/sample_profile_icon.png";
import { auth } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import{ useState, useEffect } from 'react';

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => listen(); // Cleanup subscription on unmount
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
        <SearchIcon className="search-icon" />

        <Avatar alt="Profile" src={ProfileIcon} className="navbar-profile-icon"  />
      </div>
    </nav>
  );
};

export default NavBar;
