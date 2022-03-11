import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { MapsApp } from './MapsApp';
import './styles.css'

if(!navigator.geolocation){
  alert("Your web browser do not support geolocation");
  throw new Error("Your web browser do not support geolocation");
}

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Zvcm5hIiwiYSI6ImNsMGw4Ym5zOTB0c3UzZHVvNDE5MjBvajAifQ.9yGdC9GNtqoh2ehbT0bfQw'

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);