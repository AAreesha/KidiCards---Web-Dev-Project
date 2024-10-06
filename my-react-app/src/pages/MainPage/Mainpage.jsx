import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from "../../components/Category/CategoryCards";
import Animal from "../../assets/CategoryIcons/Animals.png";
import Alphabets from "../../assets/CategoryIcons/alphabets.png";
import Fruits from "../../assets/CategoryIcons/fruits.png";
import Numbers from "../../assets/CategoryIcons/numbers.png";
import Veggies from "../../assets/CategoryIcons/veggies.png";
import Colors from "../../assets/CategoryIcons/colors.png";
import NavBar from '../../components/NavBar/NavBar';
import mouse from "../../assets/mouse.mp3";
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
  const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
  const navigate = useNavigate(); 

  const handleButtonClick = (path) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Reset sound to start
      clickSoundRef.current.play().then(() => {
        setTimeout(() => {
          navigate(path);
        }, 500);
      }).catch(error => console.error("Sound playback failed", error));
    }
  };


  return (
   
    <div className="mainpage-container">
      <NavBar/>
      <h1 className="mainpage-heading">Explore, Learn, and Play!</h1>
      <div className="category-grid">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-link"
          onClick={() => handleButtonClick(`/category/${category.name.toLowerCase()}`)} // Call handleButtonClick with the path
        >
          <CategoryCard name={category.name} image={category.image} />
        </div>
      ))}

      </div>
    </div>
  
  );
  
};

export default Mainpage;
