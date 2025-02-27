import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import yoga from "../Images/yoga-lady.jpeg"
import '../Components/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Your body</h1>
          <h1>Your temple</h1>
          <h1>Your transformation</h1>
          <h2>Shape your destiny</h2>
          <h2>Shape your body</h2>
          <Link to="/login" className="get-started-btn">
            Get Started→
          </Link>
        </div>
        <div className="hero-image">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/girl-doing-yoga-pose-illustration-download-in-svg-png-gif-file-formats--relaxation-meditation-illustrations-1519339.png?f=webp" alt="Yoga pose" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;