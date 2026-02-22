import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-container">

        {/* Logo Section */}
        <div className="footer-section">
          <h2 className="footer-logo">LifeHub</h2>
          <p>
            Your all-in-one entertainment and shopping platform.
            Movies, Music, and Books in one place.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/music">Music</Link></li>
            <li><Link to="/books">Books</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-icons">
            <span>🌐</span>
            <span>📸</span>
            <span>🐦</span>
            <span>🎥</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} LifeHub. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;