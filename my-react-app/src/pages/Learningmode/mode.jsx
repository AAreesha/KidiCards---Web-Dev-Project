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
  const { categoryName, language } = useParams();
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
    </div>
  );
};

export default FlashcardPage;
