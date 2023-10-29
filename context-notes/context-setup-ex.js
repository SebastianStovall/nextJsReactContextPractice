// this is an example on how to create a react context (FavoritesContext) that can globally manage state across multiple components
// in this case, FavoritesContext, will keep track of a user's favorited spots on AirBnB type application (connects Meetup page with Favorites page)

import { createContext, useState } from 'react'

// !!! when assigning a new context, always make sure to title case, because it will eventually end up as a react component (___.Provider)
// when using createContext(), the arg that goes inside, is the INITIAL value set (usually an object), for the globally wide state !!!
const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0
})

//  !!! the FavoritesContextProvider will be an ordinary react component, but it has the job of PROVIDING the context values to all the other components its wrapped in
// this function allows us to manipulate and update the values for our context with useState(). This provider function can later be used and imported in our other components !!!
// make sure to add export key since it will be used inside of _app.js file
export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([])

    // expect to pass in the spot you want favorited as a param for this funcion
    function addFavorite(selectedSpot) {
        // you need to use the (prevState) => {} when updating with previous state instead of passing in active state because react sometimes can't grab the value correctly
        setUserFavorites((prevFavorites) => {
            return prevFavorites.concat(selectedSpot)
        })
    }

    // expect to pass in a spotId to target to remove from favorite list
    function removeFavorite(spotId) {
        setUserFavorites((prevFavorites) => {
            return prevFavorites.filter((spot) => spot.id !== spotId)
        })
    }

    function itemIsFavorite(spotId) {
        // .some() exists in vanilla JS, it will return true if any element meets the criterion for the condition you set (if the spot is already in array, return true, else, false)
        return userFavorites.some(spot => spot.id === spotId)
    }

    // this context obj should have the same structure as the one found in FavoritesContext, since that's the initial object being passed into all our components
    // the context object holds the latest values of our context, and is the key to manipulating/updating our context
    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        // in addition to the base keys set with createContext(), pass in the functions we can use to manipulate/update this object
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
        itemIsFavorite: itemIsFavorite
    }


    // !!! this is basically saying, take the initial value of our context (context provider) and allow it to have access to all our other components in our app
    // This is possible because the provider tag is WRAPPED OUTSIDE of {props.children} which represents all our app's content
    // (demonstrated in _app.js file where all the components are rendered) !!!
    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

// export the context itself so it can later be used in other components
export default FavoritesContext





// **************** PASSING IN CONTEXT TO THE _app.js FILE *******************

import { FavoritesContextProvider } from "<insert path here>"

function MyApp({ Component, pageProps }) {
    return (
        <FavoritesContextProvider>
            <Component {...pageProps} />
        </FavoritesContextProvider>
    );
}

// ***************  ---------------------------------- ************************
