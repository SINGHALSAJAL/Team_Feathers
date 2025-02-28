
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowRight, Star, Heart, ChevronDown } from 'lucide-react';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Animate elements when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-item').forEach((el) => {
      observer.observe(el);
      // Initially hide
      el.classList.add('opacity-0');
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-yoga-light overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-yoga-accent/30 text-yoga-secondary text-sm font-medium animate-fade-in">
              Achieve your fitness goals through mindful practice
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yoga-dark leading-tight opacity-0 animate-reveal-delay-1">
              Your body<br />
              Your journey<br />
              Your <span className="text-yoga-primary">transformation</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-yoga-secondary font-medium opacity-0 animate-reveal-delay-2">
              Personalized fitness plans<br />
              Sustainable results
            </h2>
            <div className="pt-4 space-x-4 flex opacity-0 animate-reveal-delay-3">
              <Link 
                to="/login" 
                className="btn-primary flex items-center gap-2 group"
              >
                Get Started 
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </Link>
              <button 
                onClick={scrollToFeatures}
                className="btn-secondary flex items-center gap-2"
              >
                Learn More <ChevronDown size={18} />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-yoga-primary/5 rounded-full blur-3xl animate-breathe"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-xl animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800" 
                alt="Person in fitness pose" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-6 md:px-10 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-item">
            <h3 className="text-yoga-primary font-medium mb-3">Our Approach</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-yoga-dark mb-6">
              Discover Your Fitness Transformation
            </h2>
            <p className="max-w-2xl mx-auto text-yoga-secondary/80">
              Our science-backed methodology combines effective exercise routines with nutrition guidance to create a holistic approach that transforms your body and mindset.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="text-yoga-primary" size={24} />,
                title: "Personalized Plans",
                description: "Get customized workout and nutrition plans designed specifically for your body type and fitness goals."
              },
              {
                icon: <Heart className="text-yoga-primary" size={24} />,
                title: "Holistic Wellbeing",
                description: "Balance physical strength with proper recovery techniques, nurturing all aspects of your health."
              },
              {
                icon: <ArrowRight className="text-yoga-primary" size={24} />,
                title: "Progressive Growth",
                description: "Track your progress and advance at your own pace with structured guidance that builds upon your growing capabilities."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass p-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 reveal-item"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yoga-accent/30 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-yoga-dark mb-3">{feature.title}</h3>
                <p className="text-yoga-secondary/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-b from-yoga-accent/10 to-yoga-light">
        <div className="max-w-5xl mx-auto text-center reveal-item">
          <h2 className="text-3xl md:text-4xl font-bold text-yoga-dark mb-6">
            Begin Your Fitness Journey Today
          </h2>
          <p className="max-w-2xl mx-auto text-yoga-secondary/80 mb-10">
            Join our community of fitness enthusiasts and discover how our transformative approach can help you reach your goals, increase your energy levels, and bring balance to your lifestyle.
          </p>
          <Link 
            to="/login" 
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Start Your Free Trial 
            <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-yoga-dark text-white py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <img 
                src="/lovable-uploads/942647d8-e3ba-4112-9da9-f454433f1886.png" 
                alt="Our Fitness Logo" 
                className="h-8 w-auto"
              />
              Our Fitness
            </h3>
            <p className="text-white/70 max-w-md">
              Our mission is to guide you through a transformative fitness journey that combines effective workouts with proper nutrition for a more balanced and healthy life.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/exercises" className="text-white/70 hover:text-white transition-colors">Exercises</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-white/70 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-white/70 hover:text-white transition-colors">Register</Link></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Our Fitness. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
