
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4
        ${isScrolled ? 'glass shadow-sm' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-yoga-dark font-semibold text-xl tracking-tight flex items-center gap-2"
        >
          <img 
            src="/lovable-uploads/942647d8-e3ba-4112-9da9-f454433f1886.png" 
            alt="Our Fitness Logo" 
            className="h-8 w-auto"
          />
          Our Fitness
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-yoga-dark hover:text-yoga-primary transition-colors">Home</Link>
          <Link to="/about" className="text-yoga-dark hover:text-yoga-primary transition-colors">About</Link>
          <Link to="/exercises" className="text-yoga-dark hover:text-yoga-primary transition-colors">Exercises</Link>
          <Link to="/login" className="btn-primary">
            Get Started
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        <button 
          className="md:hidden text-yoga-dark focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute top-16 left-0 right-0 p-5 flex flex-col space-y-4 animate-fade-in">
          <Link 
            to="/" 
            className="text-yoga-dark hover:text-yoga-primary px-4 py-2 rounded-md hover:bg-white/30 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-yoga-dark hover:text-yoga-primary px-4 py-2 rounded-md hover:bg-white/30 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/exercises" 
            className="text-yoga-dark hover:text-yoga-primary px-4 py-2 rounded-md hover:bg-white/30 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Exercises
          </Link>
          <Link 
            to="/login" 
            className="btn-primary text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
