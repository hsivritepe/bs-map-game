import "./Map.scss";
import Map, { Marker } from "react-map-gl";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
// import { tsCallSignatureDeclaration } from "@babel/types";

function Mapbox(props) {
  let cityLocation = "";
  props.getGeoLocationFromAPI("ottawa", (cityData) => {
    cityLocation = cityData;
  });
  console.log(cityLocation);
  // const [viewport, setViewport] = useState({
  //   latitude: 45.4211,
  //   longitude: -75.6903,
  //   zoom: 2,
  // });

  // PROPS WILL SEND ME LAT AND LONG
  // FOR NOW WE JUST IMAGINE THAT LAT LONG IS A NUMBER
  // SOON IT WILL BE GIVEN TO US

  // let cityLat = props.cityLat
  // let cityLng = props.cityLng
  // let showUserMarker = props.showUserMarker;
  // let showAnswerMarker = props.showAnswerMarker;
  // let userScore = props.userScore;

  // TEMPORARY
  const cityLat = 45.4211;
  const cityLng = -75.6903;
  let showUserMarker = true;
  let showAnswerMarker = true;
  let userScore = 0;

  const [markerLocation, setMarkerLocation] = useState([]);

  console.log("trying to load map");

  const handleUserClick = (event) => {
    const clickLocation = event.lngLat;
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

    if (showUserMarker === false) {
      setMarkerLocation([]);
    }
    // THIS IS THE SEND SCORE FOR LATER
    // props.sendScore(score);
  };

  return (
    <div>
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
        {markerLocation.map((element, index) => (
          <>
            {/* USER MARKER */}
            <Marker
              latitude={element.latitude}
              longitude={element.longitude}
              key={index}
            />
          </>
        ))}
        {/* ANSWER MARKER */}
        {showAnswerMarker && (
          <Marker latitude={cityLat} longitude={cityLng} key={"answer"} />
        )}
      </Map>
    </div>
  );
}

export default Mapbox;
