import { useState } from 'react';
import { auth } from '../../firebase';
import "./Registration.css";
import Logo from "../../assets/logo.png";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dateOfBirth: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState(''); // State for notification message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if username is more than 3 characters
        if (formData.username.length < 4) {
            newErrors.username = 'Username must be more than 3 characters.';
        }

        // Check if password is more than 6 characters and contains a special character
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (formData.password.length < 7) {
            newErrors.password = 'Password must be at least 7 characters long.';
        } else if (!specialCharRegex.test(formData.password)) {
            newErrors.password = 'Password must contain at least one special character.';
        }

        // Email validation
        else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            console.log('Form data:', formData);
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Successfully registered
                    console.log('User registered:', userCredential);
                    setNotification('Account registered successfully!'); // Set notification message
                    setFormData({ username: '', email: '', dateOfBirth: '', password: '' }); // Clear form fields

                    // Automatically hide notification after 3 seconds
                    setTimeout(() => {
                        setNotification('');
                    }, 3000);
                })
                .catch((error) => {
                    console.error('Registration error:', error);
                    setErrors({ ...errors, registration: error.message }); // Update error state with registration error
                });
        }
    };

    return (
        <div className="registration-container">
            <div className="logo">
                <img src={Logo} alt="KidiCards Logo" />
            </div>

            <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        className="form-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <p className="error-message">{errors.username}</p>}

                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        className="form-input"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="for eg: abc@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}

                    <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        className="form-input"
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />

                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}

                    <button type="submit" className="register-btn">
                        Register
                    </button>
                    <button type="button" className="google-signup-btn">
                        Sign Up with Google
                    </button>

                    {errors.registration && <p className="error-message">{errors.registration}</p>} {/* Display registration error */}

                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default Registration;
