import { useParams, useNavigate } from 'react-router-dom';
import Language_SelectionCard from '../../components/Language/Language_Selection';
import AnimalImage from '../../assets/CategoryIcons/Animals.png';
import AlphabetsImage from '../../assets/CategoryIcons/alphabets.png';
import FruitsImage from '../../assets/CategoryIcons/fruits.png';
import NumbersImage from '../../assets/CategoryIcons/numbers.png';
import VeggiesImage from '../../assets/CategoryIcons/veggies.png';
import ColorsImage from '../../assets/CategoryIcons/colors.png';
import './Language.css';
import NavBar from '../../components/NavBar/NavBar';

// Translations for each category (with the same image for both English and Urdu)
const categories = {
  alphabets: { english: 'Alphabets', urdu: 'حروف', image: AlphabetsImage },
  numbers: { english: 'Numbers', urdu: 'اعداد', image: NumbersImage },
  fruits: { english: 'Fruits', urdu: 'پھل', image: FruitsImage },
  animals: { english: 'Animals', urdu: 'جانور', image: AnimalImage },
  vegetables: { english: 'Vegetables', urdu: 'سبزیاں', image: VeggiesImage },
  colors: { english: 'Colors', urdu: 'رنگ', image: ColorsImage },
};

const CategoryDetail = () => {
  const { categoryName } = useParams(); // Get the category from the URL
  const navigate = useNavigate(); // For programmatic navigation
  const category = categories[categoryName.toLowerCase()]; // Fetch the right category object

  if (!category) {
    return <div>Category not found</div>;
  }
  const handleLanguageSelection = (language) => {
    navigate(`/${categoryName.toLowerCase()}/${language}`); // Navigate to the appropriate page
  };

  return (
    <div className="language-detail-container">
    <NavBar/>
    <h1 className="languagepage-heading">Choose your language!</h1>
    <div className="languagecategory-grid">
      {/* Render the English card */}
      <div onClick={() => handleLanguageSelection('english')}>
        <Language_SelectionCard name={`${category.english}`} image={category.image} />
      </div>

      {/* Render the Urdu card */}
      <div onClick={() => handleLanguageSelection('urdu')}>
        <Language_SelectionCard name={`${category.urdu}`} image={category.image} />
      </div>
    </div>
  </div>
  );
};

export default CategoryDetail;