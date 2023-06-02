import "./App.scss";
import Mapbox from "./components/Map/Mapbox";

import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";

import {
  getGeoLocationFromAPI,
  updateUsersScore,
  getUsersForScoreboardOrderedForScore,
  registerUser,
} from "./utils";

import QuestionPage from "./components/QuestionPage";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ResultPage from "./components/ResultPage";

function App() {
  // // Examples to use the finctions
  // registerUser('testqewrqw');
  // getUsersForScoreboardOrderedForScore();
  // updateUsersScore('bde3e1f9-1f21-4da1-80e4-72345bd22ae8', {
  //     name: 'testqewrqw',
  //     score: 100,
  // });

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/game/questions" element={<QuestionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
