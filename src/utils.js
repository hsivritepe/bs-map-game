import axios from "axios";

export function getGeoLocationFromAPI(name, callback){

    const cityLocation = [];

    const configure = {
        headers: 
        { 
            'X-Api-Key': 'LC6cNm3xXD4K1DVzR1RqnQ==UTSVSZS1OTOu0V5i'
        },
    
    };

    axios
    .get(
        `https://api.api-ninjas.com/v1/city?name=${name}`, configure,
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


};

export default getGeoLocationFromAPI;