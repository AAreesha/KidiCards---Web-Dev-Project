import PropTypes from 'prop-types';
import './Learning_Mode.css'; // Your custom styles

const Learning_ModeCard = ({ image, name}) => {
  return (
    
    <div className="learningmode-card">
      <img src={image} alt={name} className="learningmode-icon" />
      <h3>{name}</h3>
    </div>
  );
};

// Adding PropTypes validation
Learning_ModeCard.propTypes = {
  image: PropTypes.string.isRequired,  // Image should be a string (URL) and is required
  name: PropTypes.string.isRequired,   // Name should be a string and is required
};

export default Learning_ModeCard;
