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
  const [isCorrect, setIsCorrect] = useState(null); 
  const [isLastFlashcardAnsweredCorrectly, setIsLastFlashcardAnsweredCorrectly] = useState(false); 
  const [showConfetti, setShowConfetti] = useState(false); 
  const navigate = useNavigate();
  let heading = ''

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
  if (language=='english')
    {
      heading= 'Test Your Memory!';
    }
  
    if (language=='urdu')
    {
        heading = '!اپنی یادداشت کا امتحان لیں'
    }
  useEffect(() => {
    if (flashcards.length > 0) {
      getNextFlashcard();
    }
    
  }, [flashcards]);

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

    // Create options
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

    if (isCorrectAnswer) {
      setIsCorrect(true); 
      setScore(prevScore => prevScore + 1); 

      // Check if this is the last flashcard
      if (testedFlashcards.size + 1 === flashcards.length) {
        setIsLastFlashcardAnsweredCorrectly(true); 
      }
    } else {
      setIsCorrect(false); 
      setIsLastFlashcardAnsweredCorrectly(false); 
    }


    setTimeout(() => {
      getNextFlashcard(); 
    }, 1000); 
  };

  const handleDone = () => {
    navigate(`/${categoryName}/${language}`, { replace: true }); 
  };

  const allTested = testedFlashcards.size === flashcards.length;

  
  const isDoneButtonDisabled = !(allTested && isLastFlashcardAnsweredCorrectly);

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
      {showConfetti && <Confetti />}
    </div>
  );
};

export default TestPage;
