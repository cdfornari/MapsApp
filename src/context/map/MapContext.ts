import { createContext } from "react";
import { MapState } from "./MapProvider";
export const MapContext = createContext<MapState>({} as MapState)