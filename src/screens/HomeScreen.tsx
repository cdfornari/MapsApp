import { BtnMyLocation, MapView, ReactLogo } from "../components"
import { SearchBar } from "../context"

export const HomeScreen = () => {
  return (
    <div>
        <MapView />
        <BtnMyLocation />
        <ReactLogo />
        <SearchBar />
    </div>
  )
}