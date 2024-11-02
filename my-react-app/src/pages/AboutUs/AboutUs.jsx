import './AboutUs.css';
import NavBar from '../../components/NavBar/NavBar';
import icon from "../../assets/icon.png";
import icon2 from "../../assets/CategoryIcons/Animals.png";
import icon3 from "../../assets/CategoryIcons/fruits.png"
import icon4 from "../../assets/CategoryIcons/veggies.png"
const AboutUs = () => {
  return (
    
    <div className="about-us">
     <NavBar/>
      <div className="about-header animated-header">

        <h1 className="fade-in">ABOUT US</h1>
        <p className="fade-in">Your magical companion for interactive learning!</p>
        <img src={icon} alt="Learning Icon" className="header-image slide-in" />
       
      </div>

      <div className="about-section animated-section">
        <div className="about-mission">
          <h2 className="fade-in-up">OUR MISSION</h2>
          <p className="fade-in-up">We aim to make learning both English and Urdu interactive, fun, and accessible. Education is no longer confined to classrooms, and our goal is to build a platform for children to learn through play.</p>
         
        </div>
        <img src={icon2} alt="Mission" className="mission-image left-to-right" />
      </div>

      <div className="about-section animated-section">
        <div className="about-features">
          <h2 className="fade-in-up">KEY FEATURES</h2>
          <ul className="fade-in-up">
          <li className='aboutus'>Bilingual Learning: Supports both English and Urdu for a comprehensive experience.</li>
  <li className='aboutus'>Interactive Flashcards: Visually engaging flashcards with sound for enhanced learning.</li>
  <li className='aboutus'>Gamified Learning: Points, leaderboards, and matching games to boost engagement.</li>
  <li className='aboutus'>Knowledge Testing: MCQs with instant feedback and visual effects.</li>
  <li className='aboutus'>Progress Tracking: Parents can monitor their child&apos;s progress and achievements.</li>
  <li className='aboutus'>Accessible Education: Provides a quality learning tool for children with limited schooling access.</li>
          </ul>
        </div>
        <img src={icon4} alt="Features" className="features-image slide-in" />
      </div>

      <div className="about-section animated-section">
        <div className="about-future">
          <h2 className="fade-in-up">OUR VISION</h2>
          <p className="fade-in-up">Breaking barriers and empowering children to learn, grow, and develop essential skills through fun and interactive experiences.</p>
         
        </div>
        <img src={icon3} alt="Vision" className="vision-image slide-in" />
      </div>
    </div>
  );
}

export default AboutUs;
