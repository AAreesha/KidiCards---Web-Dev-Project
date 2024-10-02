import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import './NavBar.css'; // Link to the CSS file for styling
import Logo from "../../assets/navbar_logo.png"
import ProfileIcon from "../../assets/sample_profile_icon.png";
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={Logo} alt="KidiCards Logo" className="navbar-logo" />
      </div>
      <div className="navbar-icons">
        <SearchIcon className="search-icon" />
        <Avatar alt="Profile" src={ProfileIcon} className="navbar-profile-icon"  />
      </div>
    </nav>
  );
};

export default NavBar;
