import PropTypes from 'prop-types';
import './test.css';
import soundIcon from '../../assets/sound.png';

const TestContainer = ({ image, audio, options, onOptionClick, selectedOption, isCorrect }) => {
  const playSound = () => {
    const audioClip = new Audio(audio);
    audioClip.play();
  };

  return (
    <div className="test-container">
      <div className="main-flashcard">
        <img src={image} alt="Flashcard" className="flashcard-image" loading="lazy" />
        <img 
          src={soundIcon} 
          alt="Play Sound" 
          className="sound-icon" 
          onClick={(e) => {
            e.stopPropagation();
            playSound();
          }} 
        />
      </div>
      <div className="option-boxes">
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          let optionClass = '';

          if (isSelected) {
            optionClass = isCorrect ? 'correct' : 'incorrect'; // Apply correct or incorrect class
          }

          return (
            <div 
              key={index} 
              className={`option-box ${optionClass}`} // Apply the dynamic class
              onClick={() => onOptionClick(option)} // Handle option click
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

TestContainer.propTypes = {
  image: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionClick: PropTypes.func.isRequired, // Prop for handling option clicks
  selectedOption: PropTypes.string, // Prop for the selected option
  isCorrect: PropTypes.bool, // Prop for correctness state
};

export default TestContainer;
