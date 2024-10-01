
import { Link } from 'react-router-dom';
import CategoryCard from "../../components/Category/CategoryCards";
import Animal from "../../assets/CategoryIcons/Animals.png";
import Alphabets from "../../assets/CategoryIcons/alphabets.png";
import Fruits from "../../assets/CategoryIcons/fruits.png";
import Numbers from "../../assets/CategoryIcons/numbers.png";
import Veggies from "../../assets/CategoryIcons/veggies.png";
import Colors from "../../assets/CategoryIcons/colors.png";
import "./Mainpage.css";

const categories = [
  { name: 'Alphabets', image: Alphabets },
  { name: 'Numbers', image: Numbers },
  { name: 'Fruits', image: Fruits },
  { name: 'Animals', image: Animal },
  { name: 'Vegetables', image: Veggies },
  { name: 'Colors', image: Colors },
];

const Mainpage = () => {
  return (
    <div className="mainpage-container">
    <h1 className="mainpage-heading">Explore, Learn, and Play!</h1>
    <div className="category-grid">
      {categories.map((category, index) => (
        <Link 
          key={index} 
          to={`/category/${category.name.toLowerCase()}`} // Dynamic route for category
          className="category-link"
        >
          <CategoryCard name={category.name} image={category.image} />
        </Link>
      ))}
    </div>
  </div>
  );
  
};

export default Mainpage;
