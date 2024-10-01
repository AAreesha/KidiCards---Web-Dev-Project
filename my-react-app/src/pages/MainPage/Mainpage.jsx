import CategoryCard from "../../components/CategoryCards";
import Animal from "../../assets/CategoryIcons/Animals.png";
import Alphabets from "../../assets/CategoryIcons/alphabets.png"
import Fruits from "../../assets/CategoryIcons/fruits.png";
import Numbers from "../../assets/CategoryIcons/numbers.png"
import Veggies from "../../assets/CategoryIcons/veggies.png"
import Colors from "../../assets/CategoryIcons/colors.png"
import "./Mainpage.css"
const categories = [
  { name: 'Alphabets', image: Alphabets },
  // Add other categories similarly
  { name: 'Numbers', image: Numbers },
  { name: 'Fruits', image: Fruits },
  { name: 'Animals', image: Animal },
  { name: 'Vegetables', image: Veggies },
  { name: 'Colors', image: Colors},
];

const Mainpage = () => {
  return (
    <div className="mainpage-container">
      <div className="category-grid">
        {categories.map((category, index) => (
          <CategoryCard key={index} name={category.name} image={category.image} />
        ))}
      </div>
    </div>
  );
};

export default Mainpage;
