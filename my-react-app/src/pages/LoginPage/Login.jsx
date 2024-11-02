import { useState, useRef, useEffect } from 'react';
import "./Login.css"
import Logo from "../../assets/logo.png"
import {auth} from "../../firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import mouse from "../../assets/mouse.mp3";

const Login = () => {
  const clickSoundRef = useRef(new Audio(mouse)); 
  clickSoundRef.current.preload = 'auto';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    clickSoundRef.current.play()
    setLoading(true); // Set loading state to true
    // Handle login logic here (e.g., call an API)
    console.log('Email:', email);
    console.log('Password:', password);
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      setNotification('Login successful!');
      setLoading(false); // Reset loading state
      console.log(userCredential)
      navigate('/mainpage'); 

    }).catch((error)=>{
      console.error(error)
      setNotification('Incorrect credentials, please try again.');
      setLoading(false)
      // alert(error.message); // Show alert for user
    })
    

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
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
           
          />

          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
           
          />
        </div>
        
          
  
      
        <button type="submit" className='login-button'  disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Dont have an account? <a href="/register">Register here</a>
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
