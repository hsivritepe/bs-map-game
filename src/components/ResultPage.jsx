import {
  getGeoLocationFromAPI,
  updateUsersScore,
  getUsersForScoreboardOrderedForScore,
  registerUser,
} from "../utils";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ResultPage() {
  const navigate = useNavigate();
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    getUsersForScoreboardOrderedForScore((result) => {
      console.log(result);
      setUserScores(result);
    });
  }, []);

  return (
    <div className="homepage ">
      <h1 className="homepage__title">Game Board</h1>
      <p className="homepage__description">Here is the score</p>

      <button className="homepage__start-button" onClick={() => navigate("/")}>
        Start
      </button>

      <div className="resultpage homepage__highest-score">
        {userScores.map((item) => (
          <div key={item.id}>
            <p>
              User Name: {item.name}, Score: {item.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultPage;
