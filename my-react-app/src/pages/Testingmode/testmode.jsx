import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlashcardContainer from '../../components/Testmode/test';
import NavBar from '../../components/NavBar/NavBar';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase'; // Ensure auth is imported
import Confetti from 'react-confetti';
import './testmode.css';

const TestPage = () => {
  const { categoryName, language } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [testedFlashcards, setTestedFlashcards] = useState(new Set());
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  let heading = '';

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

  if (language === 'english') {
    heading = 'Test Your Memory!';
  } else if (language === 'urdu') {
    heading = '!اپنی یادداشت کا امتحان لیں';
  }

  useEffect(() => {
    if (flashcards.length > 0) {
      getNextFlashcard();
    }
  }, [flashcards]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNextFlashcard = () => {
    if (testedFlashcards.size === flashcards.length) {
      setShowConfetti(true);
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    } while (testedFlashcards.has(randomIndex));

    const newFlashcard = flashcards[randomIndex];
    setCurrentFlashcard(newFlashcard);
    testedFlashcards.add(randomIndex);
    setTestedFlashcards(new Set(testedFlashcards));

    const otherOptions = flashcards
      .filter((_, index) => index !== randomIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(card => card.name);

    setOptions([newFlashcard.name, ...otherOptions].sort(() => Math.random() - 0.5));
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);
  
    const isCorrectAnswer = selectedOption === currentFlashcard.name;
  
    // Update the score only if the answer is correct
    if (isCorrectAnswer) {
      setIsCorrect(true);
      setScore(prevScore => prevScore + 1);
    } else {
      setIsCorrect(false);
    }
  
    // Check if this was the last question answered
    if (testedFlashcards.size + 1 === flashcards.length) {
      setShowConfetti(true); // Show confetti after the last question
    }
  
    setTimeout(() => {
      getNextFlashcard();
    }, 1000);
  };
  

  const handleDone = async () => {
    try {
      const db = getFirestore();
      const userId = auth.currentUser.uid; // Get current user's ID

      // Reference to the user's document
      const userRef = doc(db, `users/${userId}`);

      // Construct the path to the nested score field
      const scoreFieldPath = `scores.${language}.${categoryName}`;

      // Update the score for this category and language
      await updateDoc(userRef, {
        [scoreFieldPath]: score, // Use computed property name to set the nested score
      });

      navigate(`/${categoryName}/${language}`, { replace: true });
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const allTested = testedFlashcards.size === flashcards.length;
  const isDoneButtonDisabled = !allTested;

  return (
    <div className="test-page">
      <NavBar />
      <h1 className='Main-heading'>{heading}</h1>
      {currentFlashcard && (
        <FlashcardContainer
          image={currentFlashcard.imageUrl}
          audio={currentFlashcard.soundUrl}
          options={options}
          onOptionClick={handleOptionClick}
          selectedOption={selectedOption}
          isCorrect={isCorrect}
        />
      )}
      <button onClick={handleDone} disabled={isDoneButtonDisabled}>
        Done
      </button>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      )}
    </div>
  );
};

export default TestPage;
