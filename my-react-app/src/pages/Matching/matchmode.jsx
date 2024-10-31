import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import MatchContainer from '../../components/MatchMode/match';
import NavBar from '../../components/NavBar/NavBar';
import Confetti from 'react-confetti';
import './matchmode.css';

const MatchingPage = () => {
  const { categoryName, language } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [displayedFlashcards, setDisplayedFlashcards] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [matchedCards, setMatchedCards] = useState(new Set());
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();
  let heading = ''

  useEffect(() => {
    const fetchFlashcards = async () => {
      const db = getFirestore();
      const collectionRef = collection(db, `categories/${categoryName}/${language}Flashcards`);
      try {
        const querySnapshot = await getDocs(collectionRef);
        const fetchedFlashcards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFlashcards(fetchedFlashcards);
        initializeGame(fetchedFlashcards);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, [categoryName, language]);
  if (language=='english')
    {
      heading= 'Match Making Time!';
    }
  
    if (language=='urdu')
    {
        heading = '!جوڑ ملائیں'
    }

  const initializeGame = (flashcards) => {
    const duplicatedFlashcards = [...flashcards, ...flashcards]; 
    const shuffledCards = duplicatedFlashcards.sort(() => Math.random() - 0.5); 
    setDisplayedFlashcards(shuffledCards);
  };

  const handleCardClick = (index) => {
    if (selectedIndices.length < 2 && !matchedCards.has(index)) {
      setSelectedIndices((prev) => [...prev, index]);

      if (selectedIndices.length === 1) {
        const firstSelected = displayedFlashcards[selectedIndices[0]];
        const secondSelected = displayedFlashcards[index];

        if (firstSelected.name === secondSelected.name) {
          setMatchedCards((prev) => {
            const updated = new Set(prev).add(selectedIndices[0]).add(index);
            if (updated.size === displayedFlashcards.length) {
              setIsDone(true); 
            }
            return updated;
          });
          setSelectedIndices([]); 
        } else {
          setTimeout(() => {
            setSelectedIndices([]);
          }, 1000);
        }
      }
    }
  };

  const handleDone = () => {
    navigate(`/${categoryName}/${language}`, { replace: true }); 
  };

  return (
    <div className="matching-page">
      <NavBar />
      <h1 className="Main-heading">{heading}</h1>
      <MatchContainer
        images={displayedFlashcards.map((flashcard, index) => ({
          src: flashcard.imageUrl,
          selected: selectedIndices.includes(index) || matchedCards.has(index), 
        }))}
        onCardClick={handleCardClick}
      />
      <button className="done-match" onClick={handleDone} disabled={!isDone}>
        Done
      </button>
      {isDone && <Confetti />}
    </div>
  );
};

export default MatchingPage;
