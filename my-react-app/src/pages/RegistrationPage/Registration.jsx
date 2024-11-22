import { useState, useRef, useEffect } from 'react';
import { auth, provider} from '../../firebase'; // Ensure `db` is imported from firebase config
import { signInWithPopup} from "firebase/auth"; // Import the sign-in popup method

import db from '../../firebase';
import "./Registration.css";
import Logo from "../../assets/logo.png";
import { Link,useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import mouse from "../../assets/mouse.mp3";
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'; // Import Firestore functions

const Registration = () => {
    const navigate = useNavigate(); // Initialize useNavigate


    // const [value,setValue] = useState('')
    const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
    clickSoundRef.current.preload = 'auto';
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dateOfBirth: '',
        password: '',
    });
    
    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true); // Start loading
            const result = await signInWithPopup(auth, provider); // Use popup for Google sign-in
            const user = result.user;
            console.log("Google user signed in:", user);
    
            // Save email to localStorage
            localStorage.setItem("email", user.email);
    
            // Save user data to Firestore
            const userDoc = doc(db, 'users', user.uid); // Reference to user's document in Firestore
            const userData = {
                username: user.displayName || "New User", // Use the display name or default
                email: user.email,
                avatarId: 0, // Default avatar ID
                scores: {
                    english: {},
                    urdu: {},
                },
            };
    
            // Initialize categories with default scores
            categories.forEach((category) => {
                userData.scores.english[category] = 0;
                userData.scores.urdu[category] = 0;
            });
    
            // Add user to Firestore
            await setDoc(userDoc, userData, { merge: true }); // Use merge to avoid overwriting existing data
            console.log("User data saved to Firestore");
    
            // Navigate to the main page
            navigate('/mainpage');
        } catch (error) {
            console.error("Google Sign-In error:", error);
            setErrors({ ...errors, google: error.message }); // Set error message
            setIsLoading(false); // Stop loading on error
        }
    };
    
    // Persist user on auth state change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User signed in:", user);
                localStorage.setItem("email", user.email);
                navigate('/mainpage');
            }
        });
        return () => unsubscribe();
    }, [navigate]);
    

 

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState(''); // State for notification message
   

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
            setIsLoading(false); // Set loading state
        }

        // Check if password is more than 6 characters and contains a special character
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (formData.password.length < 7) {
            newErrors.password = 'Password must be at least 7 characters long.';
            setIsLoading(false); // Set loading state
        } else if (!specialCharRegex.test(formData.password)) {
            newErrors.password = 'Password must contain at least one special character.';
            setIsLoading(false); // Set loading state
        }

        // Email validation
        else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format.';
            setIsLoading(false); // Set loading state
        }

        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        clickSoundRef.current.play();
        const formErrors = validateForm();
        setErrors(formErrors);
    
        if (Object.keys(formErrors).length === 0) {
            try {
                // Check if the email already exists in your Firestore 'users' collection
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const emailExists = usersSnapshot.docs.some(doc => doc.data().email === formData.email);
    
                if (emailExists) {
                    setErrors({ ...errors, email: 'Email already in use.' });
                    setIsLoading(false); // Stop loading
                    return;
                }
    
                // If the email does not exist, create the user in Firebase Authentication
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
                    avatarId: 0, // Initialize avatar
                });
    
                setNotification('Account registered successfully!');
                setFormData({ username: '', email: '', dateOfBirth: '', password: '' });
    
                // Automatically hide notification after 3 seconds
                setTimeout(() => {
                    setIsLoading(false); // Stop loading
                    navigate('/mainpage'); // Redirect to the main page
                }, 3000);
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setErrors({ ...errors, email: 'Email already in use.' });
                } else {
                    console.error('Registration error:', error);
                    setErrors({ ...errors, registration: 'Failed to register. Please try again later.' });
                }
                setIsLoading(false); // Stop loading on error
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
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                    
                    <button type="button" className="google-signup-btn" onClick={handleGoogleSignIn}>
                        Sign Up with Google
                    </button>

                    {errors.registration && <p className="error-message">{errors.registration}</p>}

                    <p>
                        Already have an account? <Link to = "/login">Login</Link>
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
