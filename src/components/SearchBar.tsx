import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
    const {searchPlaces} = useContext(PlacesContext);
    const debounceRef = useRef<NodeJS.Timeout>();

    const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(debounceRef.current)
            clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(()=>{
            searchPlaces && searchPlaces(e.target.value)
        }, 500)
    }

    return (
        <div className="search-container">
            <input 
                type='text'
                className="form-control"
                placeholder="Search a place..."
                onChange={onQueryChange}
            />
            <SearchResults />
        </div>
    )
}