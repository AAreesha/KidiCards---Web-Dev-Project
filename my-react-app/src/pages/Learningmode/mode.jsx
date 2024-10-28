// FlashcardPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Flashcard from '../../components/flashcard/Flashcard';
import NavBar from '../../components/NavBar/NavBar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './mode.css';
import forward from '../../assets/forward.png';
import back from '../../assets/backward.png';

const FlashcardPage = () => {
  const { categoryName, language } = useParams(); // Extracting categoryName and language from URL
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!categoryName || !language) {
        console.error('Invalid categoryName or language:', { categoryName, language });
        return;
      }

      const db = getFirestore();
      const collectionRef = collection(db, `categories/${categoryName}/${language}Flashcards`);

      try {
        const querySnapshot = await getDocs(collectionRef);
        const fetchedFlashcards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
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
  };

  const prevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  // Reset the flip state by unflipping whenever the current index changes
  useEffect(() => {
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
      flashcard.classList.remove('flipped');
    }
  }, [currentIndex]);

  return (
    <div className="flashcard-page">
      <NavBar />
      {flashcards.length > 0 && (
        <Flashcard
          image={flashcards[currentIndex].imageUrl} // Assuming your image field is imageUrl
          text={flashcards[currentIndex].name} // Assuming your text field is name
          audio={flashcards[currentIndex].soundUrl} // Assuming your audio field is soundUrl
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
