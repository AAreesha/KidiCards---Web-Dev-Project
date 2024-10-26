import { useLocation } from 'react-router-dom';
import Learning from '../../components/Learning_Mode/Learning_Mode'; 
import './Urdu_Learning.css'; // Create a CSS file for styling
import Learn from '../../assets/LearningMode/Learn.png';
import Test from '../../assets/LearningMode/Test.png';
import Match from '../../assets/LearningMode/Match.png';
import NavBar from '../../components/NavBar/NavBar';

const UrduCategoryPage = () => {
  const location = useLocation(); // Get the current location
  const pathSegments = location.pathname.split('/'); // Split the pathname into segments
  const firstPart = pathSegments[1]; // Get the first part of the URL
  let output = '';

  // Determine output based on category
  if (firstPart === 'vegetables') {
    output = '! سبزیوں کی دُنیا میں خوش آمدید';
  } else if (firstPart === 'alphabets') {
    output = '! حروف کی دنیا میں خوش آمدید';
  } else if (firstPart === 'numbers') {
    output = '!اعداد کی دنیا میں خوش آمدید';
  } else if (firstPart === 'fruits') {
    output = '! پھلوں کی دنیا میں خوش آمدید';
  } else if (firstPart === 'animals') {
    output = '! جانوروں کی دنیا میں خوش آمدید';
  } else if (firstPart === 'colors') {
    output = '! رنگوں کی دُنیا میں خوش آمدید';
  }

  return (
    <div className="Urducategory-page-container">
      <NavBar />
      <h1 className="Urducard-heading">{output}</h1>
      <div className="Urducard-column">
        <Learning name={`سیکھنا`} image={Learn} to={`/${firstPart}/urdu/flashcards`} />
        <Learning name={`ٹیسٹ`} image={Test} />
        <Learning name={`ملاپ`} image={Match} />
      </div>
    </div>
  );
};

export default UrduCategoryPage;
