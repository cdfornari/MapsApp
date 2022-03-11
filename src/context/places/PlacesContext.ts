import { createContext } from "react";
import { PlacesState } from "./PlacesProvider";
export const PlacesContext = createContext<PlacesState>({} as PlacesState);