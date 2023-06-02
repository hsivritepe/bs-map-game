import "./App.scss";
import Mapbox from "./components/Map/Mapbox";

import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/questions" element={<Mapbox />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
