import { useRef } from "react";
import { booksData } from "../Data/booksData";

const Books = ({ cart, setCart }) => {
  const categories = [
    "fiction",
    "selfhelp",
    "business",
    "history",
    "biography",
  ];

  const scrollRefs = useRef({});

  const addToCart = (book) => {
    if (!cart.some((item) => item.id === book.id)) {
      setCart([...cart, book]);
    }
  };

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

  const heroBook = booksData[0];

  return (
    <div className="books-page">

      {/* ================= HERO ================= */}
      <div
        className="books-hero"
        style={{ backgroundImage: `url(${heroBook.image})` }}
      >
        <div className="books-hero-overlay">
          <h1>{heroBook.title}</h1>
          <p>{heroBook.author}</p>
          <button
            className="cart-btn"
            onClick={() => addToCart(heroBook)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= CATEGORY ROWS ================= */}
      {categories.map((category) => {
        const books = booksData.filter(
          (book) => book.category === category
        );

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
                className="books-row"
                ref={(el) =>
                  (scrollRefs.current[category] = el)
                }
              >
                {books.map((book) => (
                  <div className="book-card">
  <img src={book.image} alt={book.title} />

  <div className="book-details">
    <h4>{book.title}</h4>
    <p>{book.author}</p>
    <p className="book-desc">{book.description}</p>
    <p>${book.price}</p>

    <button
      className="cart-btn"
      onClick={() => addToCart(book)}
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

export default Books;