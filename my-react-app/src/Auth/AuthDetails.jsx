// import { useEffect, useState } from "react";
// import {auth} from "../firebase"
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const AuthDetails = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//     return () => listen();
//   }, []);

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("Signed out successfully");
//         setUser(null);
//         navigate("/"); // Redirect to homepage
//       })
//       .catch((error) => console.log("Error signing out:", error));
//   };

//   return (
//     <div className="AuthDetails">
//       <h1>Auth Details</h1>
//       {user ? (
//         <>
//           <p>Logged in as {user.email}</p>
//           <button onClick={handleSignOut}>Sign Out</button>
//         </>
//       ) : (
//         <p>No user is logged in.</p>
//       )}
//     </div>
//   );
// };

// export default AuthDetails;
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, getRedirectResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthDetails = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user); // If the user is logged in, store user details
        // Try to get the redirect result (to handle cases where the user was redirected)
        try {
          const result = await getRedirectResult(auth);
          if (result) {
            console.log("Redirect result:", result); // Log the result to ensure the redirect worked
            // Optionally, you can handle additional redirect logic here (e.g., navigate to a specific page)
            navigate('/mainpage');
          }
        } catch (error) {
          console.error("Error during redirect result:", error);
        }
      } else {
        setUser(null); // If no user, reset user state
      }
    });

    return () => listen(); // Cleanup the listener when the component unmounts
  }, [navigate]);

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
