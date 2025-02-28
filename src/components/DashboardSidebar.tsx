
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, LayoutDashboard, Camera, Activity } from 'lucide-react';

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div 
      className={`h-screen bg-white shadow-md flex flex-col transition-all duration-300 sticky top-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header with logo */}
      <div className="py-6 px-4 border-b border-yoga-accent/20 flex items-center justify-between">
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/942647d8-e3ba-4112-9da9-f454433f1886.png" 
              alt="Our Fitness Logo" 
              className="h-8 w-auto"
            />
            <span className="font-semibold text-yoga-dark">Our Fitness</span>
          </Link>
        )}
        {isCollapsed && (
          <Link to="/" className="mx-auto">
            <img 
              src="/lovable-uploads/942647d8-e3ba-4112-9da9-f454433f1886.png" 
              alt="Our Fitness Logo" 
              className="h-8 w-auto"
            />
          </Link>
        )}
        <button 
          className="text-yoga-secondary hover:text-yoga-primary transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center px-4 py-3 ${
                isCollapsed ? 'justify-center' : 'gap-3'
              } transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-yoga-primary/10 text-yoga-primary font-medium' 
                  : 'text-yoga-secondary hover:bg-yoga-accent/10'
              }`}
            >
              <LayoutDashboard size={20} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link 
              to="/scan-food" 
              className={`flex items-center px-4 py-3 ${
                isCollapsed ? 'justify-center' : 'gap-3'
              } transition-colors ${
                isActive('/scan-food') 
                  ? 'bg-yoga-primary/10 text-yoga-primary font-medium' 
                  : 'text-yoga-secondary hover:bg-yoga-accent/10'
              }`}
            >
              <Camera size={20} />
              {!isCollapsed && <span>Scan Your Food</span>}
            </Link>
          </li>
          <li>
            <Link 
              to="/exercise-lens" 
              className={`flex items-center px-4 py-3 ${
                isCollapsed ? 'justify-center' : 'gap-3'
              } transition-colors ${
                isActive('/exercise-lens') 
                  ? 'bg-yoga-primary/10 text-yoga-primary font-medium' 
                  : 'text-yoga-secondary hover:bg-yoga-accent/10'
              }`}
            >
              <Activity size={20} />
              {!isCollapsed && <span>Exercise Lens</span>}
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-yoga-accent/20 text-center">
        {!isCollapsed && <p className="text-xs text-yoga-secondary/70">© 2023 Our Fitness</p>}
      </div>
    </div>
  );
};

export default DashboardSidebar;
