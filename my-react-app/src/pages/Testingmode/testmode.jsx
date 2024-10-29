import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlashcardContainer from '../../components/Testmode/test';
import NavBar from '../../components/NavBar/NavBar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Confetti from 'react-confetti'; // Import Confetti
import './testmode.css'; // Import the CSS file

const TestPage = () => {
  const { categoryName, language } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [testedFlashcards, setTestedFlashcards] = useState(new Set());
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // null, true, or false
  const [isLastFlashcardAnsweredCorrectly, setIsLastFlashcardAnsweredCorrectly] = useState(false); // Track if last answer was correct
  const [showConfetti, setShowConfetti] = useState(false); // Track whether to show confetti
  const navigate = useNavigate();

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

  useEffect(() => {
    if (flashcards.length > 0) {
      getNextFlashcard();
    }
  }, [flashcards]);

  const getNextFlashcard = () => {
    if (testedFlashcards.size === flashcards.length) {
      // All flashcards have been tested
      setShowConfetti(true); // Show confetti when completed
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

    // Create options
    const otherOptions = flashcards
      .filter((_, index) => index !== randomIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(card => card.name); // Assuming `name` is the property for the option text

    setOptions([newFlashcard.name, ...otherOptions].sort(() => Math.random() - 0.5)); // Shuffle options

    // Reset selected option and correctness for the new flashcard
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption); // Set the selected option

    const isCorrectAnswer = selectedOption === currentFlashcard.name;

    if (isCorrectAnswer) {
      setIsCorrect(true); // Mark as correct
      setScore(prevScore => prevScore + 1); // Increment score for correct answer

      // Check if this is the last flashcard
      if (testedFlashcards.size + 1 === flashcards.length) {
        setIsLastFlashcardAnsweredCorrectly(true); // Track that the last answer was correct
      }
    } else {
      setIsCorrect(false); // Mark as incorrect
      setIsLastFlashcardAnsweredCorrectly(false); // Reset the last answer state
    }

    // Introduce a delay before moving to the next flashcard
    setTimeout(() => {
      getNextFlashcard(); // Move to the next flashcard
    }, 1000); // Delay of 1000ms (1 second)
  };

  const handleDone = () => {
    navigate(`/${categoryName}/${language}`, { replace: true }); // Adjust the path as needed
  };

  const allTested = testedFlashcards.size === flashcards.length;

  // Enable the Done button only if the last answer was correct
  const isDoneButtonDisabled = !(allTested && isLastFlashcardAnsweredCorrectly);

  return (
    <div className="test-page">
      <NavBar />
      <h1 className='Main-heading'>Test Your Memory!</h1>
      {currentFlashcard && (
        <FlashcardContainer
          image={currentFlashcard.imageUrl}
          audio={currentFlashcard.soundUrl}
          options={options}
          onOptionClick={handleOptionClick} // Pass the option click handler
          selectedOption={selectedOption} // Pass the selected option state
          isCorrect={isCorrect} // Pass the correctness state
        />
      )}
      {/* Show Done button and disable it until the last answer is correct */}
      <button onClick={handleDone} disabled={isDoneButtonDisabled}>
        Done
      </button>
      {/* Display confetti when all answers are completed */}
      {showConfetti && <Confetti />}
    </div>
  );
};

export default TestPage;
