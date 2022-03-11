import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiY2Zvcm5hIiwiYSI6ImNsMGw4Ym5zOTB0c3UzZHVvNDE5MjBvajAifQ.9yGdC9GNtqoh2ehbT0bfQw'
    }
})

export default directionsApi;