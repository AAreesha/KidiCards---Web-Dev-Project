
import { Link } from 'react-router-dom';
import cloudImage from "../assets/icon.png"
import "./HomePage.css"
import logo from "../assets/logo.png"
const HomePage = () => {
  return (
    <div>
     
     <img src={logo} alt="home-logo" className="home-logo" />
      <Link to="/register">
            <button className="home-register-btn">SignUp</button>
            <button className="home-login-btn">Sign In</button>
        </Link>
        <img src={cloudImage} alt="Cloud" className="cloud" />
    </div>
  );
}

export default HomePage;
