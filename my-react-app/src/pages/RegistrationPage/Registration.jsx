import { useState, useRef, useEffect } from 'react';
import { auth } from '../../firebase'; // Ensure `db` is imported from firebase config
import db from '../../firebase';
import "./Registration.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import mouse from "../../assets/mouse.mp3";
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'; // Import Firestore functions

const Registration = () => {
    const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dateOfBirth: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState(''); // State for notification message
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch categories on mount
        const fetchCategories = async () => {
            try {
                const categoriesSnapshot = await getDocs(collection(db, 'categories'));
                const categories = categoriesSnapshot.docs.map(doc => doc.id);
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const [categories, setCategories] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        clickSoundRef.current.play()
        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const userId = userCredential.user.uid;

                // Prepare initial scores data with all categories set to 0 for both English and Urdu
                const initialScores = {
                    english: {},
                    urdu: {},
                };
                categories.forEach(category => {
                    initialScores.english[category] = 0;
                    initialScores.urdu[category] = 0;
                });

                // Save user information to Firestore
                await setDoc(doc(db, 'users', userId), {
                    username: formData.username,
                    email: formData.email,
                    dateOfBirth: formData.dateOfBirth,
                    scores: initialScores, // Set initial scores with categories
                    avatar: 0 // Initialize avatar
                });

                setNotification('Account registered successfully!');
                setFormData({ username: '', email: '', dateOfBirth: '', password: '' });

                // Automatically hide notification after 3 seconds
                setTimeout(() => {
                    navigate('/mainpage'); // Redirect to the main page
                }, 3000);

            } catch (error) {
                console.error('Registration error:', error);
                setErrors({ ...errors, registration: error.message });
            }
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

                    {errors.registration && <p className="error-message">{errors.registration}</p>}

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
