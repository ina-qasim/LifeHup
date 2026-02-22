import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default NotFound;