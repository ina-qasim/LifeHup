import { useRef } from "react";
import { data } from "../Data/data";
const Movies = ({ cart, setCart }) => {
  const categories = [
    "action",
    "adventure",
    "comedy",
    "documentary",
    "drama",
    "biography",
  ];

  const scrollRefs = useRef({});

  const addToCart = (movie) => {
    if (!cart.some((item) => item.id === movie.id)) {
      setCart([...cart, movie]);
    }
  };

  const renderStars = (rating) => {
    return "⭐".repeat(Math.round(rating));
  };

  const scrollLeft = (category) => {
    scrollRefs.current[category].scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = (category) => {
    scrollRefs.current[category].scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const heroMovie = data[0]; 

  return (
    <div className="movies-page">
      {/* HERO */}
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${heroMovie.image})` }}
      >
        <div className="hero-content">
          <h1>{heroMovie.title}</h1>
          <p>{heroMovie.description}</p>
          <p>{renderStars(heroMovie.rating)}</p>
          <button
            className="cart-btn"
            onClick={() => addToCart(heroMovie)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {categories.map((category) => {
        const movies = data.filter((m) => m.category === category);

        return (
          <div key={category} className="row-section">
            <h2 className="row-title">
              {category.toUpperCase()}
            </h2>

            <div className="row-wrapper">
              <button
                className="scroll-btn left"
                onClick={() => scrollLeft(category)}
              >
                ◀
              </button>

              <div
                className="movies-row"
                ref={(el) =>
                  (scrollRefs.current[category] = el)
                }
              >
                {movies.map((movie) => (
                  <div key={movie.id} className="movie-card">
                    <img
                      src={movie.image}
                      alt={movie.title}
                    />

                    <div className="movie-details">
                      <h4>{movie.title}</h4>
                      <p>{renderStars(movie.rating)}</p>
                      <p>${movie.price}</p>
                      <button
                        onClick={() =>
                          addToCart(movie)
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="scroll-btn right"
                onClick={() => scrollRight(category)}
              >
                ▶
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;