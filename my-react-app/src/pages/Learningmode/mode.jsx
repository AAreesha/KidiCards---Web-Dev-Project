// FlashcardPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Flashcard from '../../components/flashcard/Flashcard';
import NavBar from '../../components/NavBar/NavBar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './mode.css';
import forward from '../../assets/forward.png'
import back from '../../assets/backward.png'

const FlashcardPage = () => {
  const { categoryName, language } = useParams(); // Extracting categoryName and language from URL
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false); // Track flip state

  useEffect(() => {
    // Log the parameters to ensure they are defined
    console.log("Category Name:", categoryName);
    console.log("Language:", language);

    const fetchFlashcards = async () => {
      // Check if categoryName and language are defined
      if (!categoryName || !language) {
        console.error('Invalid categoryName or language:', { categoryName, language });
        return; // Exit if either is undefined
      }

      const db = getFirestore();
      // Define the correct collection reference based on the language
      const collectionRef = collection(db, `categories/${categoryName}/${language}Flashcards`);

      try {
        const querySnapshot = await getDocs(collectionRef);
        const fetchedFlashcards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        setFlashcards(fetchedFlashcards);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, [categoryName, language]);

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false); // Reset flip state to false
  };

  const prevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false); // Reset flip state to false
  };

  return (
    <div className="flashcard-page">
      <NavBar />
      {flashcards.length > 0 && (
        <Flashcard
          image={flashcards[currentIndex].imageUrl} // Assuming your image field is imageUrl
          text={flashcards[currentIndex].name} // Assuming your text field is name
          audio={flashcards[currentIndex].soundUrl} // Assuming your audio field is soundUrl
          flipped={flipped} // Pass flip state
          setFlipped={setFlipped} // Pass setFlipped function
        />
      )}
      <div className="button-container">
        <button onClick={prevFlashcard} disabled={currentIndex === 0}>
          <img src={forward} alt="previous" />
        </button>
        <button onClick={nextFlashcard} disabled={currentIndex === flashcards.length - 1}>
          <img src={back} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;
