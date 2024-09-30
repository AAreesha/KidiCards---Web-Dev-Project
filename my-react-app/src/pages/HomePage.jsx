
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the Home Page of our application. Enjoy your stay!</p>
      <Link to="/register">
            <button className="register-btn">Go to Registration</button>
        </Link>
    </div>
  );
}

export default HomePage;
