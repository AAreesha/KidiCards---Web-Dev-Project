import {  useParams, useNavigate } from 'react-router-dom';
import Learning from '../../components/Learning_Mode/Learning_Mode'; 
import './Urdu_Learning.css'; // Create a CSS file for styling
import Learn from '../../assets/LearningMode/Learn.png';
import Test from '../../assets/LearningMode/Test.png';
import Match from '../../assets/LearningMode/Match.png';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState, useRef } from 'react';
import mouse from "../../assets/mouse.mp3";
import db from "../../firebase";
import { doc, onSnapshot } from "@firebase/firestore";

const UrduCategoryPage = () => {
  const { categoryName } = useParams(); // Get the category ID from the URL
  console.log("Id: ",categoryName)
  const navigate = useNavigate();
  const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
  const [categoryname, setCategoryName] = useState(''); // State to store the English name

  useEffect(() => {
    if (categoryName) {
      // Set up a real-time listener for the specific document in the "categories" collection
      const unsubscribe = onSnapshot(doc(db, "categories", categoryName), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setCategoryName(data.urduName || "Category"); // Set category name or fallback to "Category"
        } else {
          console.log("Category not found");
          setCategoryName("Category"); // Fallback if no document found
        }
      });

      // Clean up listener on component unmount or categoryId change
      return () => unsubscribe();
    }
  }, [categoryName]);
  
 
 
  const handlelearningSelection = (language) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Reset sound to start
      clickSoundRef.current.play().then(() => {
        setTimeout(() => {
          navigate(language); // Navigate to the appropriate page
        }, 500);
      }).catch(error => console.error("Sound playback failed", error));
    }
  };

  return (
    <div className="Urducategory-page-container">
      <NavBar />
      <h1 className="Urducard-heading"> {`!${categoryname} کی دُنیا میں خوش آمدید`}</h1>
      <div className="Urducard-column">
      <div onClick={() => handlelearningSelection(`/${categoryName}/urdu/flashcards`)}>
      <Learning name={`سیکھنا`} image={Learn}  />
      </div>
      <div  onClick={() => handlelearningSelection(`/${categoryName}/urdu/testing`)}>
        <Learning name={`ٹیسٹ`} image={Test} />
      </div>
        <Learning name={`ملاپ`} image={Match} />
      </div>
    </div>
  );
};

export default UrduCategoryPage;
