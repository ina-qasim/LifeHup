import { useParams, useNavigate } from "react-router-dom";
import { data } from "../Data/data";
import { musicData } from "../Data/musicData";
const Details = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = data.find((i) => i.id === parseInt(id));

  if (!item) return <h2>Item not found</h2>;

  return (
    <div className="details">
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
      <button onClick={() => setCart([...cart, item])}>
        Add to Cart
      </button>
    </div>
  );
};

export default Details;