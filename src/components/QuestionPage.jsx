import MapBox from "./Map/Mapbox";

function QuestionPage() {
  const currentCity = "New York";
  const currentScore = 500;

  const handleNext = () => {
    // Logic for handling the next button click
  };

  return (
    <div className="question-page">
      <div className="left-side">
        <h2>Current City:</h2>
        <h1>{currentCity}</h1>

        <p>Current Score: {currentScore}</p>
        <button onClick={handleNext}>Submit</button>

        <button onClick={handleNext}>Next</button>
      </div>

      <MapBox />
    </div>
  );
}

export default QuestionPage;
