import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContex";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <h2 className="logo">LifeHub</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/music">Music</Link>
        <Link to="/books">Books</Link>
        <Link to="/cart">Cart</Link>
      </div>
        <button
        className={`theme-toggle ${darkMode ? "dark" : ""}`}
        onClick={() => setDarkMode(!darkMode)}
        >
        <div className="toggle-circle"></div>
        </button>
      
    </nav>
  );
};

export default Navbar;