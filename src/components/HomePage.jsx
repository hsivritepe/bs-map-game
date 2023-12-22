import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <h1 className="homepage__title">
                Welcome to the Map Game
            </h1>
            <p className="homepage__description">
                Can you locate cities on the map?
            </p>
            <br />
            <br />
            <button
                className="homepage__start-button"
                onClick={() => navigate('/game')}
            >
                Start
            </button>
        </div>
    );
}

export default HomePage;
