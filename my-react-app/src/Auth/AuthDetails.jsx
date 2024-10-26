import { useEffect,useState } from "react"
import {auth} from  '../firebase'
import { onAuthStateChanged } from "firebase/auth"

const AuthDetails = () => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const listen = onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
            }
           
        })
        return ()=>listen();
    },[])

    const signOut = () =>{
        signOut(auth).then(()=>{
            console.log("signed out succesfully");
            setUser(null);
        }).catch(error => console.log(error))
    }
  return (
    <div className="AuthDetails">
        <h1>Auth Details</h1>
        {user ? (
            <>
                <p>Logged in as {user.email}</p>
                <button onClick={signOut}>Sign Out</button>
            </>
        ) : (
            <p>No user is logged in.</p>
        )}
      
    </div>
  )
}

export default AuthDetails
