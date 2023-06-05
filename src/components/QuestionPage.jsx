import { useState, useEffect } from 'react';
import MapBox from './Map/Mapbox';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import cityData from '../data/cities.json';
import { useNavigate } from 'react-router-dom';
import {
    getGeoLocationFromAPI,
    updateUsersScore,
    getUsersForScoreboardOrderedForScore,
    registerUser,
} from '../utils';

function QuestionPage() {
    const navigate = useNavigate();
    useEffect(() => {
        getCityName();
    }, []);

    const currentScore = 0;

    const [userScore, setUserScore] = useState(0);
    const [tempScore, setTempScore] = useState(0);

    const [userName, setUserName] = useState('');
    useEffect(() => {
        const userName = localStorage.getItem('userName');
        setUserName(userName);
    }, []);

    const [currentCity, setCurrentCity] = useState('');
    useEffect(() => {
        let cityIndex = Math.floor(Math.random() * cityData.length);
        setCurrentCity(cityData[cityIndex].name);
    }, []);

    //   const cityLat = 45.4211;
    //   const cityLng = -75.6903;

    const [showUserMarker, setShowUserMarker] = useState(true);
    const [showAnswerMarker, setShowAnswerMarker] = useState(false);
    const [markerLocation, setMarkerLocation] = useState([]);
    const [answerMarkerLocation, setAnswerMarkerLocation] = useState(
        []
    );
    const [numberOfQ, setNumberOfQ] = useState(0);

    const getCityName = () => {
        let cityIndex = Math.floor(Math.random() * cityData.length);
        setCurrentCity(cityData[cityIndex].name);
    };

    useEffect(() => {
        if (currentCity.length) {
            getGeoLocationFromAPI(currentCity, (response) => {
                console.log(response);
                setAnswerMarkerLocation([
                    {
                        latitude: response[0].lat,
                        longitude: response[0].lon,
                    },
                ]);
            });
        }
    }, [currentCity]);

    const handleNext = () => {
        console.log('next button clicked');
        setShowAnswerMarker(false);
        setShowUserMarker(false);
        getCityName();
        console.log('FFF : ' + numberOfQ);

        console.log('HANDLE NEXT : user name is', userName);
        console.log('HANDLE NEXT : user score is', userScore);
        updateUsersScore(localStorage.getItem('userId'), {
            name: userName,
            score: userScore,
        });
        console.log(localStorage.getItem('userId'));

        if (numberOfQ > 2) {
            //   console.log("done");
            // alert('Game Over');
            navigate('/result');
        }
    };

    const handleSubmit = () => {
        console.log('submit button clicked');
        setShowAnswerMarker(true);

        setUserScore(parseInt(userScore) + parseInt(tempScore));

        setNumberOfQ(numberOfQ + 1);
    };

    const handleUserClick = (event) => {
        const clickLocation = event.lngLat;
        setShowUserMarker(true);
        console.log('user clicked at ', clickLocation);
        setMarkerLocation([
            {
                latitude: clickLocation.lat,
                longitude: clickLocation.lng,
            },
        ]);
        setTempScore(calculateUserScore(clickLocation));
        console.log(calculateUserScore(clickLocation));
    };

    const calculateUserScore = (clickLocation) => {
        const latDif =
            clickLocation.lat - answerMarkerLocation[0].latitude;
        const lngDif =
            clickLocation.lng - answerMarkerLocation[0].longitude;

        const score = Math.sqrt(
            Math.pow(latDif, 2) + Math.pow(lngDif, 2)
        ).toFixed(2);

        return score;

        // console.log("user score is", score);
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
                    initialViewState={{
                        latitude: 45.4211,
                        longitude: -75.6903,
                        zoom: 2,
                    }}
                    mapboxAccessToken={
                        process.env.REACT_APP_MAPBOX_TOKEN
                    }
                    mapStyle="mapbox://styles/ns79765/cliew2o1d002o01odb2hhfnzp"
                    style={{ width: '100vw', height: '100vh' }}
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
                        <Marker
                            latitude={
                                answerMarkerLocation[0].latitude
                            }
                            longitude={
                                answerMarkerLocation[0].longitude
                            }
                            key={'answer'}
                        />
                    )}
                </Map>
            </div>
        </div>
    );
}

export default QuestionPage;
