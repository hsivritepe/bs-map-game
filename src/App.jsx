import './App.scss';

import HomePage from './components/HomePage';
import GamePage from './components/GamePage';

import QuestionPage from './components/QuestionPage';

import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import ResultPage from './components/ResultPage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/home"
                        element={<Navigate to="/" />}
                    />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/result" element={<ResultPage />} />
                    <Route
                        path="/game/questions"
                        element={<QuestionPage />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
