/*eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl"
import { useContext, useEffect, useReducer } from "react";
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';
import directionsApi from '../../apis/directionsApi';
import { DirectionsResponse } from '../../interfaces/directions';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
    setMap?: (map: Map) => void;
    getRoute?: (start: [number, number], end: [number, number]) => Promise<void>
}
const initialState: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}
interface Props{
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({children}: Props) => {
    const {places} = useContext(PlacesContext)
    const [mapState, dispatch] = useReducer(mapReducer, initialState);

    useEffect(() => {
      mapState.markers.forEach(marker => marker.remove())
      const newMarkers: Marker[] = [];
      for (const place of places) {
        const [lng,lat] = place.center;
        const popup = new Popup()
            .setHTML(`
                <h6>${place.text}</h6>
                <p>${place.place_name_en}</p>
            `);
        const marker = new Marker({
            color: 'red'
        })
            .setLngLat([lng,lat])
            .setPopup(popup)
            .addTo(mapState.map!);
        newMarkers.push(marker);
      }
      dispatch({type: 'setMarkers', payload: newMarkers})
    }, [places])
    
    const setMap = (map: Map) => {
        const myLocationPopup = new Popup()
            .setHTML(`
                <h6>Aqui estoy</h6>
                <p>En algun lugar</p>
            `);
        new Marker({
            color: 'red'
        })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map);
        dispatch({type: 'setMap', payload: map})
    }

    const getRoute = async(start: [number,number], end: [number,number]) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const {geometry} = resp.data.routes[0];
        const {coordinates} = geometry
        const bounds = new LngLatBounds(start,start);
        for (const coord of coordinates) {
            const newCoord: [number,number] = [coord[0],coord[1]];
            bounds.extend(newCoord);
        }
        mapState.map?.fitBounds(bounds,{
            padding: 200
        });

        const srcData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coordinates
                        }
                    }
                ]
            }
        }
        if(mapState.map?.getLayer('RouteString')){
            mapState.map?.removeLayer('RouteString');
            mapState.map?.removeSource('RouteString');
        }
        mapState.map?.addSource('RouteString',srcData);
        mapState.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                "line-color": 'black',
                "line-width": 3
            }
        })
    }

    return (
        <MapContext.Provider value={{
            ...mapState, setMap, getRoute
        }}>
            {children}
        </MapContext.Provider>
    )
}