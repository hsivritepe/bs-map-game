import {
    getGeoLocationFromAPI,
    updateUsersScore,
    getUsersForScoreboardOrderedForScore,
    registerUser,
} from '../utils';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ResultPage() {
    const [userResult, setUserResult] = useState();
    const navigate = useNavigate();
    // const result = getUsersForScoreboardOrderedForScore();

    useEffect(() => {
        getUsersForScoreboardOrderedForScore((response) => {
            setUserResult(response);
            // console.log(response);
        });
    });

    return (
        <div className="homepage">
            <h1 className="homepage__title">
                Here is the top 10 players of the game
            </h1>
            <div className="scoreboard">
                <div className="scoreboard__head">
                    <p className="scoreboard__column">ID</p>
                    <p className="scoreboard__column">Name</p>
                    <p className="scoreboard__column">Score</p>
                </div>
                {userResult &&
                    userResult.map((user) => {
                        return (
                            <div
                                className="scoreboard__item"
                                key={user.id}
                            >
                                <p className="scoreboard__column">
                                    {user.id}
                                </p>
                                <p className="scoreboard__column">
                                    {user.name}
                                </p>
                                <p className="scoreboard__column">
                                    {user.score}
                                </p>
                            </div>
                        );
                    })}
            </div>

            <button
                className="homepage__start-button"
                onClick={() => navigate('/game')}
            >
                Start
            </button>
        </div>
    );
}

export default ResultPage;
