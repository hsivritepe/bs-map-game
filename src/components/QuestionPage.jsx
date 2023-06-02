import { useState, useEffect } from "react";
import MapBox from "./Map/Mapbox";

function QuestionPage() {
  const currentCity = "New York";
  const currentScore = 0;
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setUserName(userName);
  }, []);

  const handleNext = () => {
    //TODO
  };

  const handleSubmit = () => {
    //TODO
  };

  return (
    <div className="question-page">
      <div className="left-side">
        <h2>Current City:</h2>
        <h1>{currentCity}</h1>

        <p>User Name: {userName}</p>
        <p>Current Score: {currentScore}</p>
        <button onClick={handleSubmit}>Submit</button>

        <button onClick={handleNext}>Next</button>
      </div>

      <MapBox />
    </div>
  );
}

export default QuestionPage;
