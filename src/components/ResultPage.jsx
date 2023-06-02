import {
  getGeoLocationFromAPI,
  updateUsersScore,
  getUsersForScoreboardOrderedForScore,
  registerUser,
} from "../utils";

import { useNavigate } from "react-router-dom";

function ResultPage() {
  const navigate = useNavigate();
  // const result = getUsersForScoreboardOrderedForScore();
  return (
    <div className="homepage">
      <h1 className="homepage__title">Welcome to the Map Game</h1>
      <p className="homepage__description">Can you locate cities on the map?</p>

      <button className="homepage__start-button" onClick={() => navigate("/")}>
        Start
      </button>
      {/* {result?.map((item) => {
        return <div>{item.id}</div>;
      })} */}
      {getUsersForScoreboardOrderedForScore((result) => {
        // <div>heldsadalo</div>;
        console.log("result is", result);

        result.map((item) => ()
          return <div>{item.id}</div>;
        });
      })}

      <p className="homepage__highest-score">Highest Score: </p>
    </div>
  );
}

export default ResultPage;
