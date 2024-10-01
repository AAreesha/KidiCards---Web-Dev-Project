import CategoryCard from "../../components/CategoryCards";
import Animal from "../../assets/CategoryIcons/Animals.png";
import "./Mainpage.css"
const categories = [
  { name: 'Alphabets', image: Animal },
  // Add other categories similarly
  { name: 'Numbers', image: Animal },
  { name: 'Fruits', image: Animal },
  { name: 'Animals', image: Animal },
  { name: 'Veggies', image: Animal },
  { name: 'Colors', image: Animal},
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
