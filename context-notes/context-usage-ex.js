// this hook allows us to establish a connection between this component and the context
import { useContext } from "react"

// useContext() hook takes in one arg, which is the context you want to modify
import FavoritesContext from "./context-setup-ex"

function SpotDisplay(props) {

    // use the useContext() hook to grab the context value
    const favoritesContext = useContext(FavoritesContext)

    // call the itemIsFavorite() function which is a method of the context (return a boolean)
    // we defined itemIsFavorite() to expect a spotId, so pass in the props.id to the method
    const itemIsFavorite = favoritesContext.itemIsFavorite(props.id)

    // this function will update the favorite status of a spot when its clicked
    function toggleFavoriteStatus() {
        if(itemIsFavorite) {
            favoritesContext.removeFavorite()
        } else {
            favoritesContext.addFavorite({
                id: props.id,
                title: props.title,
                description: props.description,
                image: props.image,
                address: props.address
            })
        }
    }

    // return the spot card and a button that allows you to toggle a favorite status for the spot
    return (
        <div>
            <Card />
            <button onClick={toggleFavoriteStatus}>{itemIsFavorite ? 'Remove From Favorites' : 'Add To Favorites'}</button>
        </div>
    )
}

export default SpotDisplay
