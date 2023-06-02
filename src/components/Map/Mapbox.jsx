import "./Map.scss";
import Map, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

function Mapbox() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 12,
  });

  const [markerLocation, setMarkerLocation] = useState([]);

  console.log("trying to load map");

  const handleUserClick = (event) => {
    const clickLocation = event.lngLat;
    console.log("user clicked at ", clickLocation);
    setMarkerLocation([
      { latitude: clickLocation.lat, longitude: clickLocation.lng },
    ]);
  };

  return (
    <div>
      <Map
        initialViewState={{ latitude: 45.4211, longitude: -75.6903, zoom: 2 }}
        // {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/ns79765/cliew2o1d002o01odb2hhfnzp"
        style={{ width: "100vw", height: "100vh" }}
        projection="globe"
        onClick={(event) => {
          handleUserClick(event);
        }}
      >
        {/* {{
          if(markerLocation) {
            <Marker
              latitude={markerLocation.latitude}
              longitude={markerLocation.longitude}
            />;
          },
        }} */}
        {markerLocation.map((element) => (
          <Marker latitude={element.latitude} longitude={element.longitude} />
        ))}
        {/* {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
            </button>
          </Marker>
        ))} */}
      </Map>
    </div>
  );
}

export default Mapbox;
