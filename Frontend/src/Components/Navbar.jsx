import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="https://cdn-icons-png.flaticon.com/256/6935/6935795.png" alt="OUR FITNESS" />
          <span>OUR FITNESS</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="active">Welcome</Link></li>
        <li><Link to="/exercises">Exercises</Link></li>
        <li><Link to="/fitness">Fitness</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;