import { useState, useRef } from 'react';
import "./Login.css"
import Logo from "../../assets/logo.png"
import {auth} from "../../firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import mouse from "../../assets/mouse.mp3";


const Login = () => {
  const clickSoundRef = useRef(new Audio(mouse)); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    clickSoundRef.current.play()
    // Handle login logic here (e.g., call an API)
    console.log('Email:', email);
    console.log('Password:', password);
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log(userCredential)
      navigate('/mainpage'); 

    }).catch((error)=>{
      console.error(error)
      alert(error.message); // Show alert for user
    })
    

  };

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
        
          
  
      
        <button type="submit" className='login-button'>
          Login
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Dont have an account? <a href="/register">Register here</a>
      </p>
      {/* <p>
          Go To Home Page<a href="/mainpage">Mainpage</a>
      </p>
      <p>
          Go To About Us<a href="/aboutus">About Us</a>
      </p> */}
    </div>
  );
};

export default Login;
