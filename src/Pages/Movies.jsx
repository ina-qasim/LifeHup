import { useRef, useState } from "react";
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
  const [trailerUrl, setTrailerUrl] = useState(null);

  const addToCart = (movie) => {
    if (!cart.some((item) => item.id === movie.id)) {
      setCart([...cart, movie]);
    }
  };

  const renderStars = (rating) => "⭐".repeat(Math.round(rating));
  const heroMovie = data[0];

  const scrollLeft = (category) => {
    scrollRefs.current[category]?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = (category) => {
    scrollRefs.current[category]?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="movies-page">
      
      {/* ================= HERO ================= */}
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${heroMovie.image})` }}
      >
        <div className="hero-content">
          <h1>{heroMovie.title}</h1>
          <p>{heroMovie.description}</p>
          <p>{renderStars(heroMovie.rating)}</p>

          <div className="button-group">
            <button
              className="main-btn"
              onClick={() => addToCart(heroMovie)}
            >
              Add to Cart
            </button>

            <button
              className="main-btn"
              onClick={() => setTrailerUrl(heroMovie.trailer)}
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOVIE ROWS ================= */}
      {categories.map((category) => {
        const movies = data.filter((m) => m.category === category);
        if (movies.length === 0) return null;

        return (
          <div key={category} className="row-section">
            <h2 className="row-title">{category.toUpperCase()}</h2>

            <div className="row-wrapper">
              <button
                className="scroll-btn"
                onClick={() => scrollLeft(category)}
              >
                ◀
              </button>

              <div
                className="movies-row"
                ref={(el) => (scrollRefs.current[category] = el)}
              >
                {movies.map((movie) => (
                  <div key={movie.id} className="movie-card">
                    <img src={movie.image} alt={movie.title} />

                    <div className="movie-details">
                      <h4>{movie.title}</h4>
                      <p>{renderStars(movie.rating)}</p>
                      <p>${movie.price}</p>

                      <div className="button-group">
                        <button
                          className="main-btn"
                          onClick={() => addToCart(movie)}
                        >
                          Add to Cart
                        </button>

                        <button
                          className="main-btn"
                          onClick={() => setTrailerUrl(movie.trailer)}
                        >
                          Watch Trailer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="scroll-btn"
                onClick={() => scrollRight(category)}
              >
                ▶
              </button>
            </div>
          </div>
        );
      })}

      {/* ================= TRAILER MODAL ================= */}
      {trailerUrl && (
        <div
          className="trailer-modal"
          onClick={() => setTrailerUrl(null)}
        >
          <div
            className="trailer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={trailerUrl}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <button
              className="close-btn"
              onClick={() => setTrailerUrl(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;