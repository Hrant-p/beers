import { FAVOURITE_ACTION_TYPE } from "./actionTypes";

export function addToFavouriteList(beersList, favouriteList, id) {
    return {
        type: FAVOURITE_ACTION_TYPE.ADD_TO_FAVOURITES,
        payload: { beersList, favouriteList, id }
    }
}

export function addedToFavouriteListSucceed(data) {
    return {
        type: FAVOURITE_ACTION_TYPE.ADDED_FAVOURITE_LIST_SUCCEED,
        payload: { data }
    }
}

export function clearFavouriteList() {
    return {
        type: FAVOURITE_ACTION_TYPE.CLEAR_FAVOURITE_LIST,
        payload: {}
    }
}

export function removeFromFavoriteList(list, removeId) {
    return {
        type: FAVOURITE_ACTION_TYPE.REMOVE_FROM_FAVOURITES,
        payload: { list, removeId }
    }
}

export function removeFromFavoriteListSucceed(list) {
    return {
        type: FAVOURITE_ACTION_TYPE.REMOVE_FROM_FAVOURITES_SUCCEED,
        payload: { list }
    }
}
