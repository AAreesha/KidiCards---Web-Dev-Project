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
        <img src={image} alt="Flashcard" className="flashcard-image-test" loading="lazy" />
        <img 
          src={soundIcon} 
          alt="Play Sound" 
          className="sound-icon-test" 
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
            optionClass = isCorrect ? 'correct' : 'incorrect'; 
          }

          return (
            <div 
              key={index} 
              className={`option-box-2 ${optionClass}`} 
              onClick={() => onOptionClick(option)} 
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
  onOptionClick: PropTypes.func.isRequired, 
  selectedOption: PropTypes.string, 
  isCorrect: PropTypes.bool, 
};

export default TestContainer;
