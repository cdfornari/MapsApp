import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'en',
        access_token: 'pk.eyJ1IjoiY2Zvcm5hIiwiYSI6ImNsMGw4Ym5zOTB0c3UzZHVvNDE5MjBvajAifQ.9yGdC9GNtqoh2ehbT0bfQw'
    }
})

export default searchApi;