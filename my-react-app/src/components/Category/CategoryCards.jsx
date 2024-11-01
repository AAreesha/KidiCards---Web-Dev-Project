import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import db from '../../firebase'
import { auth} from '../../firebase'; // Import Firebase auth and Firestore
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import './CategoryCards.css'; // Your custom styles
// import CircularProgress from '@mui/material/CircularProgress'; // Import loading spinner
const CategoryCard = ({ id, image, name }) => {
  const [isAdmin, setIsAdmin] = useState(false); // State to hold admin status
  const [notification, setNotification] = useState(''); // State for notification
  const [loading, setLoading] = useState(false); // State for loading
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Check if the current user is admin based on their email
        setIsAdmin(user.email === 'abc@gmail.com');
      } else {
        setIsAdmin(false); // If no user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const deleteSubcollection = async (subcollectionName) => {
    const subcollectionRef = collection(db, 'categories', id, subcollectionName);
    const subcollectionDocs = await getDocs(subcollectionRef);

    const deletePromises = subcollectionDocs.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  };

  const handleDelete = async (event) => {
    event.stopPropagation(); // Prevents the click event from bubbling up to parent elements
    setLoading(true); // Set loading state to true
    setNotification(''); // Clear previous notifications
    try {
      // Delete both subcollections: englishFlashcards and urduFlashcards
      await deleteSubcollection('englishFlashcards'); // Delete englishFlashcards subcollection
      await deleteSubcollection('urduFlashcards');    // Delete urduFlashcards subcollection
      await deleteDoc(doc(db, 'categories', id));     // Delete the category document
      console.log(`Category with ID: ${id} and its subcollections deleted successfully.`);
      // Optionally, add logic to refresh the category list or notify the user
      // Set the notification message
      setNotification('Category and its flashcards deleted successfully.');
      
      // Optionally, reset notification after a few seconds
      setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    } catch (error) {
      setNotification('Error deleting category. Please try again.');
      console.error('Error deleting category or its subcollections: ', error);
    } finally {
      setLoading(false); // Set loading state back to false after operation
      setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    }
  };

  return (
    <div className="category-card">
      <img src={image} alt={name} className="category-icon" />
      <h3>{name}</h3>
      {isAdmin && (
        <button className='delete-category' onClick={handleDelete}>
          {loading ? (
           <>Deleting...</> // Show loading spinner
          ) : (
            <>
              <DeleteIcon className="delete-icon" /> {/* Add the icon with some margin */}
              Delete 
            </>
          )}
        </button>
      )}
       {notification && <div className="notification">{notification}</div>} {/* Display notification */}
    </div>
  );
};

// Adding PropTypes validation
CategoryCard.propTypes = {
  id: PropTypes.string.isRequired,    // Include id in PropTypes validation
  image: PropTypes.string.isRequired,  // Image should be a string (URL) and is required
  name: PropTypes.string.isRequired,   // Name should be a string and is required
};

export default CategoryCard;
