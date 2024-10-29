import PropTypes from 'prop-types';
import './match.css';


const MatchContainer = ({ images, onCardClick }) => {
    return (
        <div className="match-container">
            <div className="image-row">
                {images.slice(0, 5).map((image, index) => ( 
                    <div
                        key={index}
                        className={`flashcard ${image.selected ? 'selected' : ''} ${image.matched ? 'matched' : ''}`}
                        onClick={() => onCardClick(index)}
                    >
                        <div className="flashcard-content">
                            {image.matched || image.selected ? ( 
                                <img className="flashcard-image" src={image.src} alt="flashcard" />
                            ) : (
                                <div className="card-back">?</div> 
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="image-row">
                {images.slice(5).map((image, index) => ( 
                    <div
                        key={index + 5} 
                        className={`flashcard ${image.selected ? 'selected' : ''} ${image.matched ? 'matched' : ''}`}
                        onClick={() => onCardClick(index + 5)} 
                    >
                        <div className="flashcard-content">
                            {image.matched || image.selected ? ( 
                                <img className="flashcard-image" src={image.src} alt="flashcard" />
                            ) : (
                                <div className="card-back">?</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

MatchContainer.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            selected: PropTypes.bool,
            matched: PropTypes.bool,
        })
    ).isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default MatchContainer;
