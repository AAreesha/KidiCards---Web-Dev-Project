import { createContext, useState, useEffect } from 'react';
import { auth } from './firebase'; // Make sure to import your firebase configuration
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Create AuthContext
export const AuthContext = createContext(null);

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Set Firebase authentication persistence
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user); // Set the current user state
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

