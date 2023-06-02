import { useNavigate } from "react-router-dom";

function HomePage() {
  const highestScore = 1000; //highestScore so far
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1 className="homepage__title">Welcome to the Map Game</h1>
      <p className="homepage__description">Can you locate cities on the map?</p>

      <button
        className="homepage__start-button"
        onClick={() => navigate("/game")}
      >
        Start
      </button>

      <p className="homepage__highest-score">Highest Score: {highestScore}</p>
    </div>
  );
}

export default HomePage;
