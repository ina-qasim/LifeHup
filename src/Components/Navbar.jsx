import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContex";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">LifeHub</h2>

      {/* Hamburger */}
      <div 
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`links ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/movies" onClick={() => setMenuOpen(false)}>Movies</Link>
        <Link to="/music" onClick={() => setMenuOpen(false)}>Music</Link>
        <Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>

        <button
          className={`theme-toggle ${darkMode ? "dark" : ""}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          <div className="toggle-circle"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;