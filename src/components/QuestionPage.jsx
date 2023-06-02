import { useState, useEffect } from "react";
import MapBox from "./Map/Mapbox";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import cityData from "../data/cities.json";
import { getGeoLocationFromAPI } from "../utils";

function QuestionPage() {
  const currentScore = 0;
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setUserName(userName);
  }, []);

  const [currentCity, setCurrentCity] = useState("");
  useEffect(() => {
    let cityIndex = Math.floor(Math.random() * cityData.length);
    setCurrentCity(cityData[cityIndex].name);
  }, []);

  const cityLat = 45.4211;
  const cityLng = -75.6903;

  let userScore = 0;

  const [showUserMarker, setShowUserMarker] = useState(true);
  const [showAnswerMarker, setShowAnswerMarker] = useState(false);
  const [markerLocation, setMarkerLocation] = useState([]);

  const handleNext = () => {
    console.log("next button clicked");
    setShowAnswerMarker(false);
    setShowUserMarker(false);
    let cityIndex = Math.floor(Math.random() * cityData.length);
    setCurrentCity(cityData[cityIndex].name);
  };

  const handleSubmit = () => {
    console.log("submit button clicked");
    setShowAnswerMarker(true);
  };

  const handleUserClick = (event) => {
    const clickLocation = event.lngLat;
    setShowUserMarker(true);
    console.log("user clicked at ", clickLocation);
    setMarkerLocation([
      { latitude: clickLocation.lat, longitude: clickLocation.lng },
    ]);
    calculateUserScore(clickLocation);
  };

  const calculateUserScore = (clickLocation) => {
    const latDif = clickLocation.lat - cityLat;
    const lngDif = clickLocation.lng - cityLng;

    const score = Math.sqrt(Math.pow(latDif, 2) + Math.pow(lngDif, 2)).toFixed(
      2
    );
    userScore += score;
    console.log("user score is", score);
    // THIS IS THE SEND SCORE FOR LATER
    // props.sendScore(score);
  };

  return (
    <div className="question-page">
      <div className="left-side">
        <h2>Current City:</h2>
        <h1>{currentCity}</h1>
        <p>User Name: {userName}</p>
        <p>Current Score: {userScore}</p>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleNext}>Next</button>
      </div>

      <div className="mapbox">
        <Map
          initialViewState={{ latitude: 45.4211, longitude: -75.6903, zoom: 2 }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/ns79765/cliew2o1d002o01odb2hhfnzp"
          style={{ width: "100vw", height: "100vh" }}
          projection="globe"
          onClick={(event) => {
            handleUserClick(event);
          }}
        >
          {/* USER MARKER */}
          {showUserMarker &&
            markerLocation.map((element, index) => (
              <Marker
                latitude={element.latitude}
                longitude={element.longitude}
                key={index}
              />
            ))}

          {/* ANSWER MARKER */}
          {showAnswerMarker && (
            <Marker latitude={cityLat} longitude={cityLng} key={"answer"} />
          )}
        </Map>
      </div>
    </div>
  );
}

export default QuestionPage;
