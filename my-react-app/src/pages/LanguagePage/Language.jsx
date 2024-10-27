import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Language_SelectionCard from '../../components/Language/Language_Selection';
import NavBar from '../../components/NavBar/NavBar';
import mouse from "../../assets/mouse.mp3";
import db  from '../../firebase'; // Import your Firestore instance
import { doc, onSnapshot} from 'firebase/firestore'; // Import Firestore functions
import "./Language.css"
const CategoryDetail = () => {
  const { categoryId } = useParams(); // Get the category from the URL
  const navigate = useNavigate(); // For programmatic navigation
  const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
  const [category, setCategory] = useState({ english: '', urdu: '', image: '' }); // Initialize state

  useEffect(() => {
    // Fetch the main document in the "categories" collection using the categoryId
    const unsubscribe = onSnapshot(doc(db, "categories", categoryId), (doc) => {
      if (doc.exists()) {
        const categoryData = doc.data(); // Get the main category document data

        // Set the state directly from the main document fields
        setCategory({
          english: categoryData.englishName || '', // Access English name
          urdu: categoryData.urduName || '', // Access Urdu name
          image: categoryData.image || '' // Access image
        });
      } else {
        console.log("Category not found");
      }
    });

    // Cleanup subscription on unmount or categoryId change
    return () => unsubscribe();
  }, [categoryId]);

  if (!category.english && !category.urdu) {
    return <div>Loading category...</div>; // Display a loading message while fetching data
  }

  const handleLanguageSelection = (language) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Reset sound to start
      clickSoundRef.current.play().then(() => {
        setTimeout(() => {
          navigate(`/${categoryId}/${language}`); // Navigate to the appropriate page
        }, 500);
      }).catch(error => console.error("Sound playback failed", error));
    }
  };

  return (
    <div className="language-detail-container">
    
      <NavBar />
      <h1 className="languagepage-heading">Choose your language!</h1>
      <div className="languagecategory-grid">
        {/* Render the English card */}
        <div onClick={() => handleLanguageSelection('english')}>
          <Language_SelectionCard name={category.english} image={category.image} />
        </div>

        {/* Render the Urdu card */}
        <div onClick={() => handleLanguageSelection('urdu')}>
          <Language_SelectionCard name={category.urdu} image={category.image} />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
