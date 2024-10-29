import Avatar from '@mui/material/Avatar';
import Profileicon from "../../assets/girl1.png"; //1
import Profileicon1 from "../../assets/boy.png"; //2
import Profileicon2 from "../../assets/boy2.png"; //3
import Profileicon3 from "../../assets/girl.png"; //4
import './ProfileIcon.css'; // Custom CSS for styling
import { auth } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../firebase'; // Import your Firestore configuration
import NavBar from '../../components/NavBar/NavBar';

const avatars = [
  { id: 1, src: Profileicon }, 
  { id: 2, src: Profileicon1 },
  { id: 3, src: Profileicon2 },
  { id: 4, src: Profileicon3 },  // Changed id to 4
];

const ProfileIcon = () => {
  const handleAvatarSelect = async (avatarId) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid; // Get the current user's ID
      try {
        // Update the user's avatar ID in Firestore
        await setDoc(doc(db, 'users', userId), { avatarId }, { merge: true });

        alert('Avatar updated successfully!');
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  return (
    <div className='avatar-page'>
      <NavBar />
      <div className="avatar-selection">
        <h2 className='avatar-select'>Select Your Avatar!</h2>
        <div className="avatar-grid">
          {avatars.map((avatar) => (
            <Avatar
              key={avatar.id}
              src={avatar.src}
              alt={`Avatar ${avatar.id}`}
              className="avatar-option"
              onClick={() => handleAvatarSelect(avatar.id)}  
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
