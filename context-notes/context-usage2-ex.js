// Once the context is setup for the Spot component, we can again use the context to display all the favorited Spots (this should be the last js file you look at in this folder)
import { useContext } from "react"
import FavoritesContext from "./context-setup-ex"
import SpotDisplay from "./context-usage-ex"

// ***IMPORTANT NOTE*** if you were to reload the favorite's page, the favorite's list would be lost. If you want persistant storage of the context, you would
// need to utilize local storage back in the FavoritesProvider() function...
// this makes sense. For example, if you used context for a Spotify multimedia player, when you reload the page when the song is playing, it would start you from the beginning
// of the track (unless you had local storage to get the exact timestamp and loaded that data accordingly)

function FavoritesPage() {
    const favoriteContext = useContext(FavoritesContext)
    let content;

    if(favoriteContext.totalFavorites === 0) {
        content = <p>You have no favorites yet. Start Adding Some!</p>
    } else {
        content = <SpotDisplay spots={favoriteContext.favorites}/>
    }

    return (
        <div>
            <h1>My Favorites List</h1>
            {content}
        </div>
    )
}

export default FavoritesPage
