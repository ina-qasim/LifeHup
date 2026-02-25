import { useLocation, useNavigate } from "react-router-dom";

const Details = ({ cart, setCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state;

  if (!item) return <h2>Item not found</h2>;

  const addToCart = () => {
    if (!cart.some((i) => i.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  return (
    <div className="details">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <div className="details-container">
        <img src={item.image} alt={item.title} />

        <div className="details-info">
          <h2>{item.title}</h2>

          {item.author && <p><strong>Author:</strong> {item.author}</p>}
          {item.artist && <p><strong>Artist:</strong> {item.artist}</p>}
          {item.year && <p><strong>Year:</strong> {item.year}</p>}

          {item.description && <p>{item.description}</p>}

          <h3>${item.price}</h3>

          <button onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;