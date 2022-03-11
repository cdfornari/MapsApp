import { useContext } from "react"
import { MapContext, PlacesContext } from '../context';

export const BtnMyLocation = () => {
    const {isMapReady,map} = useContext(MapContext);
    const {userLocation} = useContext(PlacesContext);
    const centerMap = () => {
        if (!isMapReady) return alert("We are loading the map");
        if(!userLocation) return alert("We do not have your location yet");
        map?.flyTo({zoom: 15, center: userLocation});
    }
    return (
        <button
            className="btn btn-primary"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
            onClick={centerMap}
        >
            Go to my location
        </button>
    )
}