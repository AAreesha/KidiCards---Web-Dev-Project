import { useEffect, useState } from "react";
import {auth} from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthDetails = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => listen();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        setUser(null);
        navigate("/"); // Redirect to homepage
      })
      .catch((error) => console.log("Error signing out:", error));
  };

  return (
    <div className="AuthDetails">
      <h1>Auth Details</h1>
      {user ? (
        <>
          <p>Logged in as {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <p>No user is logged in.</p>
      )}
    </div>
  );
};

export default AuthDetails;
