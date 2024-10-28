// Flashcard.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Flashcard.css';
import sound from '../../assets/sound.png';

const Flashcard = ({ image, text, audio, resetFlip }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const playSound = () => {
    const audioClip = new Audio(audio);
    audioClip.play();
  };

  // Reset flipped state whenever resetFlip changes
  useEffect(() => {
    setFlipped(false);
  }, [resetFlip]);

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      {flipped ? (
        <div className="flashcard-back">
          <span className="flashcard-text">{text}</span>
          <img
            src={sound}
            alt="Sound Icon"
            className="sound-icon"
            onClick={(e) => {
              e.stopPropagation();
              playSound();
            }}
          />
        </div>
      ) : (
        <img src={image} alt={text} className="flashcard-image" />
      )}
    </div>
  );
};

Flashcard.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  resetFlip: PropTypes.number.isRequired, // New prop
};

export default Flashcard;
