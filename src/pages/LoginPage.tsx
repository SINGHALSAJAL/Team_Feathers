
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for the admin credentials
    if (email === "admin" && password === "admin123") {
      toast.success("Login successful!");
      navigate("/onboarding");
      return;
    }
    
    // Handle regular login logic
    if (email && password) {
      toast.success("Login successful!");
      navigate("/onboarding");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      // Simulate Google login with a timeout
      setTimeout(() => {
        toast.success("Google login successful!");
        navigate("/onboarding");
        setIsGoogleLoading(false);
      }, 1500);
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      setIsGoogleLoading(false);
    }
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
            <h1 className="text-3xl font-bold text-yoga-dark mb-2">Welcome back</h1>
            <p className="text-yoga-secondary/80">Enter your credentials to access your account</p>
          </div>
          
          <div className="flex space-x-2 mb-8 border-b border-yoga-accent/30">
            <button 
              className="py-3 px-4 font-medium text-yoga-primary border-b-2 border-yoga-primary"
            >
              Login
            </button>
            <Link 
              to="/register" 
              className="py-3 px-4 font-medium text-yoga-secondary/70 hover:text-yoga-secondary transition-colors"
            >
              Register
            </Link>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5 animate-fade-up">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-yoga-secondary">
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email or username"
                required
              />
              <p className="text-xs text-yoga-secondary/70 italic">
                Demo account: admin
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-yoga-secondary">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-yoga-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Enter your password"
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
              <p className="text-xs text-yoga-secondary/70 italic">
                Demo password: admin123
              </p>
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
            
            <div className="text-center pt-2">
              <p className="text-yoga-secondary/70">
                Don't have an account? {" "}
                <Link to="/register" className="text-yoga-primary hover:underline">
                  Register
                </Link>
              </p>
            </div>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-yoga-accent/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-yoga-secondary/70 bg-white">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="flex items-center justify-center gap-2 py-3 px-4 w-full border border-yoga-accent/50 rounded-md hover:bg-yoga-accent/10 transition-colors relative"
              >
                {isGoogleLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-yoga-dark">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-medium">Continue with Google</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 bg-yoga-accent/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200"
            alt="Fitness training"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-yoga-primary/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="glass p-10 rounded-2xl max-w-lg text-center">
              <h2 className="text-2xl font-bold text-yoga-dark mb-4">Begin Your Transformation</h2>
              <p className="text-yoga-secondary">
                "Fitness is not about being better than someone else. It's about being better than you used to be."
              </p>
              <p className="mt-4 text-yoga-primary font-medium">— Unknown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
