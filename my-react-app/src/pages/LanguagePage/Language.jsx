import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Language_SelectionCard from '../../components/Language/Language_Selection';
import NavBar from '../../components/NavBar/NavBar';
import mouse from "../../assets/mouse.mp3";
import db  from '../../firebase'; // Import your Firestore instance
import { doc, onSnapshot, collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import "./Language.css"
const CategoryDetail = () => {
  const { categoryId } = useParams(); // Get the category from the URL
  const navigate = useNavigate(); // For programmatic navigation
  const clickSoundRef = useRef(new Audio(mouse)); // Create a new Audio object for mouse sound
  const [category, setCategory] = useState({ english: '', urdu: '', image: '' }); // Initialize state

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "categories", categoryId), async (doc) => {
      if (doc.exists()) {
        const categoryData = doc.data(); // Get the main category document data

        console.log(categoryData);
        // Fetch English data
        const englishCollection = collection(doc.ref, "english");
        const englishDocs = await getDocs(englishCollection);
        const englishName = englishDocs.docs[0]?.data()?.EnglishName || ''; // Get the English name

        console.log(englishName)
        // Fetch Urdu data
        const urduCollection = collection(doc.ref, "urdu");
        const urduDocs = await getDocs(urduCollection);
        const urduName = urduDocs.docs[0]?.data()?.UrduName || ''; // Get the Urdu name

        // Set the state with category details including English and Urdu names
        setCategory({
          english: englishName,
          urdu: urduName,
          image: categoryData.image || '' // Assuming there's an image in the main document
        });
      } else {
        console.log("Category not found");
      }
    });

    // Cleanup subscription on unmount
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
