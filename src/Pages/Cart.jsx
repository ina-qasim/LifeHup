import { useRef, useState } from "react";

const Cart = ({ cart, setCart }) => {
  const scrollRefs = useRef({});
  const [showSuccess, setShowSuccess] = useState(false);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const scrollLeft = (type) => {
    scrollRefs.current[type]?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = (type) => {
    scrollRefs.current[type]?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const handleBuy = () => {
    setShowSuccess(true);
    setCart([]);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const movies = cart.filter((item) => item.year);
  const books = cart.filter((item) => item.author);
  const music = cart.filter((item) => item.artist);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const renderSection = (title, items, type) => {
    if (items.length === 0) return null;

    return (
      <div className="cart-section">
        <h2 className="row-title">{title}</h2>

        <div className="row-wrapper">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft(type)}
          >
            ◀
          </button>

          <div
            className="cart-row"
            ref={(el) => (scrollRefs.current[type] = el)}
          >
            {items.map((item) => (
              <div key={item.id} className="movie-card">
                <img src={item.image} alt={item.title} />

                <div className="movie-details">
                  <h4>{item.title}</h4>

                  {item.author && <p>{item.author}</p>}
                  {item.artist && <p>{item.artist}</p>}
                  {item.year && <p>{item.year}</p>}

                  <p className="price">${item.price}</p>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight(type)}
          >
            ▶
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <h2 style={{ marginTop: "80px" }}>
          Your cart is empty 🛒
        </h2>
      ) : (
        <>
          {renderSection("🎬 Movies", movies, "movies")}
          {renderSection("🎵 Music", music, "music")}
          {renderSection("📚 Books", books, "books")}

          <div className="cart-summary">
            <h2>Total: ${total}</h2>
            <button className="buy-btn" onClick={handleBuy}>
              Buy Now
            </button>
          </div>
        </>
      )}

      {showSuccess && (
        <div className="success-popup">
          <div className="success-card">
            <h2>✅ Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button onClick={() => setShowSuccess(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;