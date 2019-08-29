import {all, put, takeLatest} from 'redux-saga/effects';
import {requestError, setLoadingState} from "../store/actions/beerActionCreators";
import {
    addedToFavouriteListSucceed,
    addToFavouriteList,
    removeFromFavoriteListSucceed
} from "../store/actions/favoriteActionCreator";
import {FAVOURITE_ACTION_TYPE} from "../store/actions/actionTypes";

function* addToFavourite({ payload: { beersList, favouriteList,  id }}) {
 try {
     yield put(setLoadingState(true));
     const arr = yield beersList.filter(item => item.id === id);
     if (favouriteList.filter(fav => fav.id === id).length < 1) {
         yield put(addedToFavouriteListSucceed(arr))
     }
     yield put(setLoadingState(false));

 } catch (e) {
     yield put(setLoadingState(false));
     yield put(requestError(e))
    alert(e)
 }
}

function* removeFromFavourites({ payload: { list, removeId }}) {
    try {
        yield put(setLoadingState(true));
        const favouriteItem = yield list.filter(item => item.id === removeId)
        const index = yield list.indexOf(...favouriteItem);
        if (index > -1) {
            const newList = yield [
                ...list.slice(0, index), ...list.slice(index + 1)
            ];
            yield put(removeFromFavoriteListSucceed(newList))
        }
        yield put(setLoadingState(false));

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e))
        alert(e)
    }
}

function* clearFavourites () {
    try {
        yield put(setLoadingState(true));
        yield put(removeFromFavoriteListSucceed([]));
        yield put(setLoadingState(false));

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e));
        alert(e)
    }
}

export function* favouriteSaga() {
    yield all( [
        takeLatest(FAVOURITE_ACTION_TYPE.ADD_TO_FAVOURITES, addToFavourite),
        takeLatest(FAVOURITE_ACTION_TYPE.REMOVE_FROM_FAVOURITES, removeFromFavourites),
        takeLatest(FAVOURITE_ACTION_TYPE.CLEAR_FAVOURITE_LIST, clearFavourites)
    ])
}