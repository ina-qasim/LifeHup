import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../Data/data";
import { musicData } from "../Data/musicData";
import { booksData } from "../Data/booksData";

const Home = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const scrollRefs = useRef({});

  const heroItems = [data[0], musicData[0], booksData[0]];
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) =>
        prev === heroItems.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const hero = heroItems[currentHero];

  const addToCart = (item) => {
    if (!cart.some((i) => i.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const scrollLeft = (section) => {
    scrollRefs.current[section]?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = (section) => {
    scrollRefs.current[section]?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const renderRow = (title, items, section, path) => (
    <div className="home-section">
      <div className="home-section-header">
        <h2>{title}</h2>
        <button className="view-all-btn" onClick={() => navigate(path)}>
          View All →
        </button>
      </div>

      <div className="row-wrapper">
        <button className="scroll-btn left" onClick={() => scrollLeft(section)}>
          ◀
        </button>

        <div
          className="home-row"
          ref={(el) => (scrollRefs.current[section] = el)}
        >
          {items.slice(0, 10).map((item) => (
            <div key={item.id} className="movie-card">
              <img src={item.image} alt={item.title} />
              <div className="movie-details">
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <button className="cart-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scrollRight(section)}>
          ▶
        </button>
      </div>
    </div>
  );

  return (
    <div className="home-page">
      {/* HERO */}
      <div className="home-hero fade" style={{ backgroundImage: `url(${hero.image})` }}>
        <div className="home-hero-content">
          <h1>{hero.title}</h1>
          <p>{hero.description || hero.artist || hero.author}</p>
          <button onClick={() => addToCart(hero)}>Add to Cart</button>
        </div>
      </div>

      {/* ROWS */}
      {renderRow("🎬 Movies", data, "movies", "/movies")}
      {renderRow("🎵 Music", musicData, "music", "/music")}
      {renderRow("📚 Books", booksData, "books", "/books")}
    </div>
  );
};

export default Home;