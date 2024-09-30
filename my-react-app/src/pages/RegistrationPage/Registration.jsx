import { useState } from 'react';

import "./Registration.css";
import Logo from "../../assets/logo.png";

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        dateOfBirth: '',
        gender: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        console.log('Form data:', formData);
    };

    return (
        <div className="registration-container">
            <div className="logo">
                <img src={Logo} alt="KidiCards Logo" />
            </div>
           
            <div className="form-container">
           

                <form className="register-form" onSubmit={handleSubmit}>
                
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth (YYYY-MM-DD)"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="register-btn">
                        Register
                    </button>
                    <button type="button" className="google-signup-btn">
                        Sign Up with Google
                    </button>

                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registration;
