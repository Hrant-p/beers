import { FAVOURITE_ACTION_TYPE } from "./actionTypes";

export function addToFavouriteList(id) {
    return {
        type: FAVOURITE_ACTION_TYPE.ADD_TO_FAVOURITES,
        payload: { id }
    }
}

export function removeFromFavoriteList(removeId) {
    return {
        type: FAVOURITE_ACTION_TYPE.REMOVE_FROM_FAVOURITES,
        payload: { removeId }
    }
}

export function setNewFavouriteList(listOfId) {
    return {
        type: FAVOURITE_ACTION_TYPE.SET_NEW_FAVOURITE_LIST,
        payload: { listOfId }
    }
}
