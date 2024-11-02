import {  useParams,useNavigate } from 'react-router-dom';
import Learning from '../../components/Learning_Mode/Learning_Mode'; 
import './English_Learning.css'; // Create a CSS file for styling
import Learn from '../../assets/LearningMode/Learn.png';
import Test from '../../assets/LearningMode/Test.png';
import Match from '../../assets/LearningMode/Match.png';
import NavBar from '../../components/NavBar/NavBar';
import mouse from "../../assets/mouse.mp3";
import { useEffect, useState, useRef } from 'react';
import db from "../../firebase";
import { doc, onSnapshot } from "@firebase/firestore";

const EnglishCategoryPage = () => {
  const { categoryName } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate();
  const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
  clickSoundRef.current.preload = 'auto';
  console.log("Id: ",categoryName)
  const [categoryname, setCategoryName] = useState(''); // State to store the English name

  useEffect(() => {
    if (categoryName) {
      // Set up a real-time listener for the specific document in the "categories" collection
      const unsubscribe = onSnapshot(doc(db, "categories", categoryName), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setCategoryName(data.englishName || "Category"); // Set category name or fallback to "Category"
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
    <div className="Englishcategory-page-container">
      <NavBar />
      <h1 className="Englishcard-heading">{categoryname} Time!</h1>
      <div className="Englishcard-column">
      <div onClick={() => handlelearningSelection(`/${categoryName}/english/flashcards`)}>
        <Learning name={`Learn`} image={Learn} />
        </div>
        <div  onClick={() => handlelearningSelection(`/${categoryName}/english/testing`)}>
        <Learning name={`Test`} image={Test} />
        </div>
        <div  onClick={() => handlelearningSelection(`/${categoryName}/english/matching`)}>
        <Learning name={`Matching`} image={Match} />
        </div>
      </div>
    </div>
  );
};

export default EnglishCategoryPage;
