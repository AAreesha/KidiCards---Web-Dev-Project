import { useLocation } from 'react-router-dom';
import Learning from '../../components/Learning_Mode/Learning_Mode'; 
import './Urdu_Learning.css'; // Create a CSS file for styling
import Learn from '../../assets/LearningMode/Learn.png'
import Test from '../../assets/LearningMode/Test.png'
import Match from '../../assets/LearningMode/Match.png'
import NavBar from '../../components/NavBar/NavBar';

const UrduCategoryPage = () => {
  const location = useLocation(); // Get the current location
  const pathSegments = location.pathname.split('/'); // Split the pathname into segments
  const firstPart = pathSegments[1]; // Get the first part of the URL
  let output = '';
  if (firstPart == 'vegetables')
    {
      output = '! آؤ سبزیاں سیکھیں'
    }
    else if (firstPart == 'alphabets')
      {
        output = '! آؤ حروف سیکھیں'
      }
      else if (firstPart == 'numbers')
        {
          output = '! آؤ اعداد  سیکھیں'
        }
      else if (firstPart == 'fruits')
        {
          output = '! آؤ پھل سیکھیں'
        }
      else if (firstPart == 'animals')
        {
          output = '! آؤ جانور سیکھیں'
        }
      else if (firstPart == 'colors')
        {
          output = '! آؤ رنگ سیکھیں'
        }
  return (
    <div className="Urducategory-page-container">
        <NavBar/>
        <h1 className="Urducard-heading">{output}</h1>
      <div className="Urducard-column">
      <Learning name={`سیکھنا`} image={Learn} />
      <Learning name={`ٹیسٹ`} image={Test} />
      <Learning name={`ملاپ`} image={Match} />
      </div>
    </div>
  );
};

export default UrduCategoryPage;
