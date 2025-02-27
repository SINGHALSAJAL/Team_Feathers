import { useState } from "react";
import { Link } from "react-router-dom";
import "../Components/LoginPage.css"; // Reusing the same CSS for consistent styling

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="login-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <Link to="/">
            <div className="logo-container">OUR FITNESS</div>
          </Link>
        </div>
      </header>

      {/* Main Register Section */}
      <main className="login-container">
        {/* Tabs for Login and Register */}
        <div className="tabs">
          <div className="tab">
            <Link to="/login">Login</Link>
          </div>
          <div className="tab active">Register</div>
        </div>

        {/* Register Form */}
        <form className="login-form">
            <div className="flex gap-5">
            <div className="form-group">
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="form-group">
            <input type="tel" placeholder="Phone Number" required />
          </div>
            </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Country" required />
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="form-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>

          <div className="register-prompt">
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>

        {/* Background Image Section */}
        <div className="background-image"></div>
      </main>
    </div>
  );
};

export default RegisterPage;

