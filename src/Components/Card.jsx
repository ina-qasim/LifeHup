import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart is Empty 🛒</h2>
        <button onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />

            <div className="cart-info">
              <h3>{item.title}</h3>

              {item.author && <p>Author: {item.author}</p>}
              {item.artist && <p>Artist: {item.artist}</p>}
              {item.description && (
                <p className="cart-desc">
                  {item.description}
                </p>
              )}

              <h4>${item.price}</h4>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ${totalPrice}</h2>
        <button className="checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;