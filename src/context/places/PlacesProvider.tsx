import { useEffect, useReducer } from "react"
import { placesReducer } from './placesReducer';
import { PlacesContext } from './PlacesContext';
import { getUserLocation } from "../../helpers";
import searchApi from "../../apis/searchApi";
import { PlacesResponse, Feature } from '../../interfaces/places';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number,number];
  isLoadingPlaces: boolean;
  places: Feature[];
  searchPlaces?: (query: string) => Promise<Feature[]>;
}

const initialState: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

interface Props{
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({children}: Props) => {
  const [placesState, dispatch] = useReducer(placesReducer, initialState);

  useEffect(() => {
    getUserLocation()
      .then( coords => dispatch({type: 'setUserLocation', payload: coords}))
  }, [])

  const searchPlaces = async(query: string): Promise<Feature[]> => {
    if (query.length === 0){
      dispatch({type: 'setPlaces', payload: []})
      return [];
    };
    if(!placesState.userLocation){ 
      alert("We do not have your location yet")
      return [];
    };

    dispatch({type: 'setLoadingPlaces'})
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`,{
      params: {
        proximity: placesState.userLocation.join(',')
      }
    })
    dispatch({type: 'setPlaces', payload: resp.data.features})

    return resp.data.features;
  }

  return (
    <PlacesContext.Provider value={{...placesState, searchPlaces}}>
      {children}
    </PlacesContext.Provider>
  )
}