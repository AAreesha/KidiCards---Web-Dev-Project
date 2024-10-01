import PropTypes from 'prop-types';
import './Language_Selection.css'; // Your custom styles

const Language_SelectionCard = ({ image, name }) => {
  return (
    <div className="languageselection-card">
      <img src={image} alt={name} className="languageselection-icon" />
      <h3>{name}</h3>
    </div>
  );
};

// Adding PropTypes validation
Language_SelectionCard.propTypes = {
  image: PropTypes.string.isRequired,  // Image should be a string (URL) and is required
  name: PropTypes.string.isRequired,   // Name should be a string and is required
};

export default Language_SelectionCard;
