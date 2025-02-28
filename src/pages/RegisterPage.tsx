
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";
import { toast } from "sonner";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!fullName || !phoneNumber || !email || !country || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Handle registration logic here
    toast.success("Account created successfully!");
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 lg:p-16 justify-center relative">
        <Link 
          to="/" 
          className="absolute top-8 left-8 text-yoga-dark font-semibold text-xl tracking-tight"
        >
          Transformative Fitness
        </Link>
        
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8 animate-fade-in text-center md:text-left">
            <h1 className="text-3xl font-bold text-yoga-dark mb-2">Create your account</h1>
            <p className="text-yoga-secondary/80">Join our fitness community to begin your transformation</p>
          </div>
          
          <div className="flex space-x-2 mb-8 border-b border-yoga-accent/30">
            <Link 
              to="/login" 
              className="py-3 px-4 font-medium text-yoga-secondary/70 hover:text-yoga-secondary transition-colors"
            >
              Login
            </Link>
            <button 
              className="py-3 px-4 font-medium text-yoga-primary border-b-2 border-yoga-primary"
            >
              Register
            </button>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-yoga-secondary">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-yoga-secondary">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input-field"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-yoga-secondary">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-yoga-secondary">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input-field"
                placeholder="Enter your country"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-yoga-secondary">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-yoga-secondary/70 hover:text-yoga-secondary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-yoga-secondary">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-yoga-secondary/70 hover:text-yoga-secondary transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && password === confirmPassword && (
                <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                  <Check size={14} /> Passwords match
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-yoga-accent/50 text-yoga-primary focus:ring-yoga-primary/30"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-yoga-secondary/80">
                I agree to the <a href="#" className="text-yoga-primary hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-yoga-primary hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Create Account
            </button>
            
            <div className="text-center pt-2">
              <p className="text-yoga-secondary/70">
                Already have an account? {" "}
                <Link to="/login" className="text-yoga-primary hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 bg-yoga-accent/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200"
            alt="Fitness training"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-yoga-primary/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="glass p-10 rounded-2xl max-w-lg text-center">
              <h2 className="text-2xl font-bold text-yoga-dark mb-4">Join Our Community</h2>
              <p className="text-yoga-secondary">
                "The journey of a thousand miles begins with a single step. Your fitness journey starts here."
              </p>
              <p className="mt-4 text-yoga-primary font-medium">— Lao Tzu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
