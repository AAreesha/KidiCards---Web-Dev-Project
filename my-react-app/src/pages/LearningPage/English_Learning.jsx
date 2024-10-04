import { useLocation } from 'react-router-dom';
import Learning from '../../components/Learning_Mode/Learning_Mode'; 
import './English_Learning.css'; // Create a CSS file for styling
import Learn from '../../assets/LearningMode/Learn.png'
import Test from '../../assets/LearningMode/Test.png'
import Match from '../../assets/LearningMode/Match.png'
import NavBar from '../../components/NavBar/NavBar';


const EnglishCategoryPage = () => {
  const location = useLocation(); // Get the current location
  const pathSegments = location.pathname.split('/'); // Split the pathname into segments

  const firstPart = pathSegments[1]; // Get the first part of the URL
  const firstPart1 = firstPart.slice(0, -1);
  return (
    <div className="Englishcategory-page-container">
      <NavBar/>
      <h1 className="Englishcard-heading">{firstPart1} Time!</h1>
      <div className="Englishcard-column">
      <Learning name={`Learn`} image={Learn}/>
      <Learning name={`Test`} image={Test} />
      <Learning name={`Matching`} image={Match} />
      </div>
    </div>
  );
};

export default EnglishCategoryPage;
