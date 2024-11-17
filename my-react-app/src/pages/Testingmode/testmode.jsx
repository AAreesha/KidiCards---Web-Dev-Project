import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlashcardContainer from '../../components/Testmode/test';
import NavBar from '../../components/NavBar/NavBar';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase'; // Ensure auth is imported
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
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();
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

  const getNextFlashcard = () => {
    // Check if all flashcards are tested
    if (testedFlashcards.size === flashcards.length) {
      setCurrentFlashcard(null); // Clear the current flashcard
      return; // Exit function
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
    setNotification({ message: '', type: '' }); // Reset notification
  };

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);

    const isCorrectAnswer = selectedOption === currentFlashcard.name;

    // Update the score only if the answer is correct
    if (isCorrectAnswer) {
      setIsCorrect(true);
      setScore(prevScore => prevScore + 1);
      setNotification({ message: 'Great job! 🎉', type: 'success' });
    } else {
      setIsCorrect(false);
      setNotification({ message: 'Oh no, try again! 😢', type: 'error' });
    }

    setTimeout(() => {
      // Check if all flashcards are tested before proceeding
      if (testedFlashcards.size < flashcards.length) {
        getNextFlashcard();
      } else {
        setNotification({ message: 'You have completed all tests!', type: 'success' });
      }
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
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <button className="done-button" onClick={handleDone} disabled={isDoneButtonDisabled}>
        Done
      </button>
    </div>
  );
};

export default TestPage;
