import { useState, useRef, useEffect } from 'react';
import "./Login.css";
import Logo from "../../assets/logo.png";
import { auth, provider } from "../../firebase"; // Ensure provider is imported from Firebase config
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import mouse from "../../assets/mouse.mp3";

const Login = () => {
  const clickSoundRef = useRef(new Audio(mouse)); 
  clickSoundRef.current.preload = 'auto';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleloading, setGoogleLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    clickSoundRef.current.play();
    setLoading(true); // Set loading state to true
    
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setNotification('Login successful!');
        setLoading(false); // Reset loading state
        navigate('/mainpage'); 
      })
      .catch((error) => {
        console.error(error);
        setNotification('Incorrect credentials, please try again.');
        setLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      clickSoundRef.current.play();
      setGoogleLoading(true);

      await signInWithPopup(auth, provider); // Use Google sign-in
      setNotification('Login successful!');
      setGoogleLoading(false);
      navigate('/mainpage');
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setNotification('Google Sign-In failed, please try again.');
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={Logo} alt="KidiCards Logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="login-form-group" style={{ marginBottom: '15px' }}>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        <button
          type="submit"
          className="google-signin-button"
          onClick={handleGoogleSignIn}
          disabled={googleloading}
        >
           {googleloading ? 'Loading...' : 'Sign In with Google'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Don{"'"}t have an account? <Link to="/register">Register here</Link>
      </p>

      {notification && (
        <div className="notification-login">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Login;
