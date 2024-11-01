import { useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import storage for image uploads
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For file handling
import './Form.css'
import NavBar from '../../components/NavBar/NavBar';
const FirebaseForm = () => {
  const db = getFirestore();
  const storage = getStorage(); // Initialize storage

  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [urduName, setUrduName] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State for flashcards
  const [urduFlashcards, setUrduFlashcards] = useState([]);
  const [englishFlashcards, setEnglishFlashcards] = useState([]);

  const handleAddUrduFlashcard = () => {
    setUrduFlashcards([...urduFlashcards, { sound: null, image: null, name: '' }]);
  };

  const handleAddEnglishFlashcard = () => {
    setEnglishFlashcards([...englishFlashcards, { sound: null, image: null, name: '' }]);
  };

  const handleFlashcardChange = (index, field, value, isUrdu) => {
    const newFlashcards = isUrdu ? [...urduFlashcards] : [...englishFlashcards];
    newFlashcards[index][field] = value;
    isUrdu ? setUrduFlashcards(newFlashcards) : setEnglishFlashcards(newFlashcards);
  };

  const handleFileChange = (index, field, file, isUrdu) => {
    const newFlashcards = isUrdu ? [...urduFlashcards] : [...englishFlashcards];
    newFlashcards[index][field] = file;
    isUrdu ? setUrduFlashcards(newFlashcards) : setEnglishFlashcards(newFlashcards);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification('');
    // setNotification('Uploading data, please wait...');

    try{
    // Upload category image to Firebase Storage
    const categoryImageRef = ref(storage, `categoryImages/${categoryImage.name}`);
    await uploadBytes(categoryImageRef, categoryImage);
    const categoryImageUrl = await getDownloadURL(categoryImageRef);

    // Save category info to Firestore
    const categoriesRef = collection(db, 'categories');
    const categoryDoc = await addDoc(categoriesRef, {
      name: categoryName,
      image: categoryImageUrl,
      urduName,
      englishName,
    });

    // Handle Urdu flashcards upload
    for (const flashcard of urduFlashcards) {
      const flashcardData = {
        name: flashcard.name,
      };

      // Upload sound if it exists
      if (flashcard.sound) {
        const soundRef = ref(storage, `flashcards/${categoryDoc.id}/urdu/${flashcard.sound.name}`);
        await uploadBytes(soundRef, flashcard.sound);
        flashcardData.soundUrl = await getDownloadURL(soundRef);
      }

      // Upload image if it exists
      if (flashcard.image) {
        const imageRef = ref(storage, `flashcards/${categoryDoc.id}/urdu/${flashcard.image.name}`);
        await uploadBytes(imageRef, flashcard.image);
        flashcardData.imageUrl = await getDownloadURL(imageRef);
      }

      // Save Urdu flashcard data to Firestore
      await addDoc(collection(db, `categories/${categoryDoc.id}/urduFlashcards`), flashcardData);
    }

    // Handle English flashcards upload
    for (const flashcard of englishFlashcards) {
      const flashcardData = {
        name: flashcard.name,
      };

      // Upload sound if it exists
      if (flashcard.sound) {
        const soundRef = ref(storage, `flashcards/${categoryDoc.id}/english/${flashcard.sound.name}`);
        await uploadBytes(soundRef, flashcard.sound);
        flashcardData.soundUrl = await getDownloadURL(soundRef);
      }

      // Upload image if it exists
      if (flashcard.image) {
        const imageRef = ref(storage, `flashcards/${categoryDoc.id}/english/${flashcard.image.name}`);
        await uploadBytes(imageRef, flashcard.image);
        flashcardData.imageUrl = await getDownloadURL(imageRef);
      }

      // Save English flashcard data to Firestore
      await addDoc(collection(db, `categories/${categoryDoc.id}/englishFlashcards`), flashcardData);
    }

    setNotification('Category and flashcards uploaded successfully!');
    setLoading(false);


    // Reset form fields
    setCategoryName('');
    setCategoryImage(null);
    setUrduName('');
    setEnglishName('');
    setUrduFlashcards([]);
    setEnglishFlashcards([]);
    }catch(error) {
    console.error("Error uploading data: ", error);
    setNotification('An error occurred. Please try again.');
    setLoading(false);
   }
  };

  return (
<div className="admin-form-scrollable">
      <form onSubmit={handleSubmit} className="admin-form-category">
        <div>
          <NavBar />
          <h1 className='form-heading'>Add Category Form</h1>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="admin-form-input"
          />
        </div>

        <div>
          <label>Category Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            required
            className="admin-form-input"
          />
        </div>

        <div>
          <label>Urdu Name:</label>
          <input
            type="text"
            value={urduName}
            onChange={(e) => setUrduName(e.target.value)}
            required
            className="admin-form-input"
          />
        </div>

        <div>
          <label>English Name:</label>
          <input
            type="text"
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
            required
            className="admin-form-input"
          />
        </div>

        <div>
        <h3 className = "flashcards-heading">Urdu Flashcards</h3>
        {urduFlashcards.map((flashcard, index) => (
          <div key={index} className="flashcard-container"> {/* New wrapper div */}
            <label>Flashcard Name:</label>
            <input
              type="text"
              value={flashcard.name}
              onChange={(e) => handleFlashcardChange(index, 'name', e.target.value, true)}
              required
              className="admin-form-input"
            />
            <label>Flashcard Sound:</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange(index, 'sound', e.target.files[0], true)}
              className="admin-form-input"
            />
            <label>Flashcard Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, 'image', e.target.files[0], true)}
              className="admin-form-input"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddUrduFlashcard} className="admin-form-button">Add Urdu Flashcard</button>
      </div>


        <div>
          <h3 className='flashcards-heading'>English Flashcards</h3>
          {englishFlashcards.map((flashcard, index) => (
            <div key={index} className='flashcard-container'>
              <label>Flashcard Name:</label>
              <input
                type="text"
                value={flashcard.name}
                onChange={(e) => handleFlashcardChange(index, 'name', e.target.value, false)}
                required
                className="admin-form-input"
              />
              <label>Flashcard Sound:</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange(index, 'sound', e.target.files[0], false)}
                className="admin-form-input"
              />
              <label>Flashcard Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(index, 'image', e.target.files[0], false)}
                className="admin-form-input"
              />
            </div>
          ))}
          <button type="button"  onClick={handleAddEnglishFlashcard} className="admin-form-button">Add English Flashcard</button>
        </div>

        <button type="submit" className="admin-form-submit"> {loading ? 'Saving...' : 'Save'}</button>
      </form>
      {notification && (
      <div className="notification-form">
        {notification}
      </div>
      )}
    </div>


  );
};

export default FirebaseForm;
