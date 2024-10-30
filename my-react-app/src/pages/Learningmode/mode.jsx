import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Flashcard from '../../components/flashcard/Flashcard';
import NavBar from '../../components/NavBar/NavBar';
import { getFirestore, collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'; // Import onSnapshot
import './mode.css';
import forward from '../../assets/forward.png';
import back from '../../assets/backward.png';

const FlashcardPage = () => {
  const { categoryName, language } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [newFlashcardName, setNewFlashcardName] = useState(''); // State for new name

  useEffect(() => {
    const db = getFirestore();
    const collectionRef = collection(db, `categories/${categoryName}/${language}Flashcards`);

    // Set up a real-time listener
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const fetchedFlashcards = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlashcards(fetchedFlashcards);
      
      // Update newFlashcardName to the first flashcard's name after fetching
      if (fetchedFlashcards.length > 0) {
        setNewFlashcardName(fetchedFlashcards[0].name);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [categoryName, language]);

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setNewFlashcardName(flashcards[(currentIndex + 1) % flashcards.length].name); // Update input value for next card
  };

  const prevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setNewFlashcardName(flashcards[(currentIndex - 1 + flashcards.length) % flashcards.length].name); // Update input value for previous card
  };

  const handleEdit = () => {
    setEditMode(true);
    setNewFlashcardName(flashcards[currentIndex].name); // Set the current flashcard name for editing
  };

  const handleUpdateFlashcard = async () => {
    const db = getFirestore();
    const flashcardRef = doc(db, `categories/${categoryName}/${language}Flashcards`, flashcards[currentIndex].id);
    
    try {
      await updateDoc(flashcardRef, { name: newFlashcardName }); // Update the flashcard name
      console.log(`Flashcard name updated to: ${newFlashcardName}`);
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  return (
    <div className="flashcard-page">
      <NavBar />
      {flashcards.length > 0 && (
        <Flashcard
          image={flashcards[currentIndex].imageUrl}
          text={flashcards[currentIndex].name}
          audio={flashcards[currentIndex].soundUrl}
          resetFlip={currentIndex} // Pass currentIndex to reset flip state
        />
      )}
      <div className="button-container">
        <button onClick={prevFlashcard} disabled={currentIndex === 0}>
          <img src={back} alt="Previous" />
        </button>
        <button onClick={nextFlashcard} disabled={currentIndex === flashcards.length - 1}>
          <img src={forward} alt="Next" />
        </button>
      </div>
      {editMode ? (
        <div className="edit-container">
          <input
            type="text"
            value={newFlashcardName}
            onChange={(e) => setNewFlashcardName(e.target.value)} // Update new flashcard name state
          />
          <button onClick={handleUpdateFlashcard}>Update Flashcard Name</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit Flashcard Name</button>
      )}
    </div>
  );
};

export default FlashcardPage;
