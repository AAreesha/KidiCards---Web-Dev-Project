// Flashcard.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Flashcard.css';
import sound from '../../assets/sound.png';

const Flashcard = ({ image, text, audio, flipped, setFlipped }) => {
  const playSound = () => {
    const audioClip = new Audio(audio);
    audioClip.play();
  };

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      {flipped ? (
        <div className="flashcard-back">
          <span className="flashcard-text">{text}</span>
          <img
            src={sound} // Replace with the path to your sound icon
            alt="Sound Icon"
            className="sound-icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent flip on icon click
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
  flipped: PropTypes.bool.isRequired, // Add prop type for flipped
  setFlipped: PropTypes.func.isRequired, // Add prop type for setFlipped
};

export default Flashcard;
