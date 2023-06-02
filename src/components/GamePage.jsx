import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import {
  getGeoLocationFromAPI,
  updateUsersScore,
  getUsersForScoreboardOrderedForScore,
  registerUser,
} from "../utils";

function GamePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  return (
    <div className="game-page">
      <h1>Start Game</h1>

      <div className="input-group">
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <button
        className="gamepage__start-button"
        onClick={() => {
          registerUser(name, (data) => {
            setId(data.id);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("userName", data.name);
            navigate("/game/questions");
          });
        }}
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
