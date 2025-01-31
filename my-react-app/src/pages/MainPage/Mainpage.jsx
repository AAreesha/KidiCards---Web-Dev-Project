import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from "../../components/Category/CategoryCards";
// import Animal from "../../assets/CategoryIcons/Animals.png";
// import Alphabets from "../../assets/CategoryIcons/alphabets.png";
// import Fruits from "../../assets/CategoryIcons/fruits.png";
// import Numbers from "../../assets/CategoryIcons/numbers.png";
// import Veggies from "../../assets/CategoryIcons/veggies.png";
// import Colors from "../../assets/CategoryIcons/colors.png";
import NavBar from '../../components/NavBar/NavBar';
import mouse from "../../assets/mouse.mp3";
import "./Mainpage.css";
import { useEffect } from 'react';
import db from "../../firebase"
import {onSnapshot, collection} from "@firebase/firestore"
import { useState } from 'react';

// const categories = [
//   { name: 'Alphabets', image: Alphabets },
//   { name: 'Numbers', image: Numbers },
//   { name: 'Fruits', image: Fruits },
//   { name: 'Animals', image: Animal },
//   { name: 'Vegetables', image: Veggies },
//   { name: 'Colors', image: Colors },
// ];

const Mainpage = () => {
  const [categories,setCategories] = useState([])
  const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
  clickSoundRef.current.preload = 'auto';
  const navigate = useNavigate(); 

  useEffect(()=>{
    onSnapshot(collection(db,"categories"),(snapshot) =>{
      setCategories(snapshot.docs.map(doc => ({id:doc.id, ...doc.data()})))
    })
  },[]);

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
          onClick={() => handleButtonClick(`/category/${category.id}`)} // Call handleButtonClick with the path
        >
          <CategoryCard id={category.id} name={category.name} image={category.image} />
        </div>
      ))}
     
      </div>
    </div>
  
  );
  
};

export default Mainpage;
