import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../Components/LoginPage.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate(); // ✅ Initialize navigate function

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

      {/* Main Login Section */}
      <main className="login-container">
        {/* Tabs for Login and Register */}
        <div className="tabs">
          <div
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </div>
          <div
            className={`tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("register");
              navigate("/register"); // ✅ Navigate to Register Page
            }}
          >
            Register
          </div>
        </div>

        {/* Login Form */}
        <form className="login-form">
          <div className="form-group">
            <input type="text" placeholder="Your email/phone number" required />
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

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="register-prompt">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link>
          </div>

          {/* Social Login Buttons */}
          <div className="social-login">
            <button type="button" className="social-btn google-btn">
              <span className="social-icon">G</span>
              Sign in with Google
            </button>
            <button type="button" className="social-btn apple-btn">
              <span className="social-icon">🍎</span>
              Sign in with apple
            </button>
          </div>
        </form>

        {/* Background Image Section */}
        <div className="background-image"></div>
      </main>
    </div>
  );
};

export default LoginPage;

