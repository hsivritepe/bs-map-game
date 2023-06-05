import axios from 'axios';

export function getGeoLocationFromAPI(name, callback) {
    const cityLocation = [];

    const configure = {
        headers: {
            'X-Api-Key': 'LC6cNm3xXD4K1DVzR1RqnQ==UTSVSZS1OTOu0V5i',
        },
    };

    axios
        .get(
            `https://api.api-ninjas.com/v1/city?name=${name}`,
            configure
        )
        .then((response) => {
            const { latitude } = response.data[0];
            const { longitude } = response.data[0];

            cityLocation.push({
                lat: latitude,
                lon: longitude,
            });

            callback(cityLocation);
        })
        .catch((error) => {
            console.error(error);
        });
}

export function registerUser(name, callback) {
    axios
        .post('http://localhost:8888/users', {
            name,
            score: 0,
        })
        .then((response) => {
            console.log(response.data);
            callback(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}
export function getUsersForScoreboardOrderedForScore(callback) {
    axios
        .get('http://localhost:8888/users')
        .then((response) => {
            response.data.sort((a, b) => a.score - b.score);

            // Returning the top 10 users
            const top10Users = response.data.slice(0, 10);
            // console.log(response.data);
            // console.log(top10Users);
            callback(top10Users);
        })
        .catch((error) => {
            console.error(error);
        });
}

export function updateUsersScore(userId, userData) {
    axios
        .patch(`http://localhost:8888/users/${userId}`, {
            userData,
        })
        .then((response) => {
            console.log('updateUsersScore : ');
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}
