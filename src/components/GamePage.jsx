import { useNavigate } from "react-router-dom";

function GamePage() {
  const navigate = useNavigate();

  return (
    <div className="game-page">
      <h1>Start Game</h1>

      <div className="input-group">
        <label htmlFor="name">Your Name:</label>
        <input type="text" id="name" />
      </div>

      <button
        className="gamepage__start-button"
        onClick={() => navigate("/game/questions")}
      >
        Start Game
      </button>

      <div className="game-page__instructions">
        <h2>How to play:</h2>
        <p>
          1. Locate the city on the map by clicking or dragging your pointer.
        </p>
        <p>
          2. Your score will be based on the distance to the actual location.
        </p>
      </div>
    </div>
  );
}

export default GamePage;
