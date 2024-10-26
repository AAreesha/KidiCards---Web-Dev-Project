// FlashcardPage.jsx
import  { useState } from 'react';
import Flashcard from '../../components/flashcard/flashcard';
import './mode.css';
import NavBar from '../../components/NavBar/NavBar';

// Array of flashcards
const flashcards = [
  { id: 1, image: 'path-to-apple-image.png', text: 'Apple', audio: 'path-to-apple-audio.mp3' },
  { id: 2, image: 'path-to-banana-image.png', text: 'Banana', audio: 'path-to-banana-audio.mp3' },
  // Add more flashcards as needed
];

const FlashcardPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flashcard-page">
         <NavBar />
      <Flashcard
        image={flashcards[currentIndex].image}
        text={flashcards[currentIndex].text}
        audio={flashcards[currentIndex].audio}
      />
      <div className="button-container">
        <button onClick={prevFlashcard} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={nextFlashcard} disabled={currentIndex === flashcards.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;
