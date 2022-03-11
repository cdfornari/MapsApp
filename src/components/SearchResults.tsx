import { useContext, useState } from "react"
import { PlacesContext,MapContext } from "../context"
import { Feature } from '../interfaces/places';

export const SearchResults = () => {
    const {places,isLoadingPlaces,userLocation} = useContext(PlacesContext);
    const {map,getRoute} = useContext(MapContext);

    const [activePlace, setActivePlace] = useState('')

    const onPlaceClick = (place: Feature) => {
        setActivePlace(place.id)
        const [lng,lat] = place.center;
        map?.flyTo({
            zoom: 15,
            center: [lng,lat]
        })
    }

    const onDirectionClick = (place: Feature) => {
        if(!userLocation) return;
        const [lng,lat] = place.center;
        getRoute && getRoute(userLocation,[lng,lat]);
    }

    if(isLoadingPlaces) return (
        <div className="alert alert-primary mt-2 mb-0">
            <h6>Searching places...</h6>
        </div>
    );
    else if(places.length === 0) return <></>

    return (
        <ul className="list-group mt-3">
            {
                places.map((place: Feature) => (
                    <li 
                        className={`list-group-item list-group-item-action pointer ${activePlace === place.id && 'active'}`}
                        key={place.id}
                        onClick={() => onPlaceClick(place)}
                    >
                        <h6>{place.text}</h6>
                        <p className={`${activePlace !== place.id && 'text-muted'}`} style={{fontSize: '12px'}}>
                            {place.place_name_en}
                        </p>
                        <button 
                            className={`btn btn-sm ${activePlace === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}
                            onClick={() => onDirectionClick(place)}
                        >
                            Directions
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}