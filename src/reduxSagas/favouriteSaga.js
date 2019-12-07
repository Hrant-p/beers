import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import { requestError, setLoadingState } from '../store/actions/beerActionCreators';
import {
  addedToFavouriteListSucceed,
  removeFromFavoriteListSucceed,
} from '../store/actions/favoriteActionCreator';
import { FAVOURITE_ACTION_TYPE } from '../store/actions/actionTypes';
import { request } from '../services/requestService';
import { constructUrl } from '../API/helpers';
import { beerAPI } from '../API/apiConsts';

function* addToFavourite({ payload: { beersList, favouriteList, id } }) {
  try {
    yield put(setLoadingState(true));
    const arr = yield beersList.filter((item) => item.get('id') === id);
    const { size } = favouriteList.filter((fav) => fav.get('id') === id);
    if (arr.size > 0 && size < 1) {
      yield put(addedToFavouriteListSucceed(arr));
    } else if (arr.size < 1 && size < 1) {
      const { data } = yield call(
        request,
        'GET',
        constructUrl([beerAPI, id], {}),
      );
      yield put(addedToFavouriteListSucceed(data));
    }
    yield put(setLoadingState(false));
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(requestError(e));
    console.log(e);
  }
}

function* removeFromFavourites({ payload: { list, removeId } }) {
  try {
    yield put(setLoadingState(true));
    const favouriteItem = yield list.filter((item) => item.get('id') === removeId);
    const index = yield list.indexOf(...favouriteItem);
    if (index > -1) {
      const newList = yield list.slice(0, index).concat(list.slice(index + 1));
      yield put(removeFromFavoriteListSucceed(newList));
    }
    yield put(setLoadingState(false));
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(requestError(e));
    console.log(e);
  }
}

function* clearFavourites() {
  try {
    yield put(setLoadingState(true));
    yield put(removeFromFavoriteListSucceed([]));
    yield put(setLoadingState(false));
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(requestError(e));
    console.log(e);
  }
}

export function* favouriteSaga() {
  yield all([
    takeLatest(FAVOURITE_ACTION_TYPE.ADD_TO_FAVOURITES, addToFavourite),
    takeLatest(FAVOURITE_ACTION_TYPE.REMOVE_FROM_FAVOURITES, removeFromFavourites),
    takeLatest(FAVOURITE_ACTION_TYPE.CLEAR_FAVOURITE_LIST, clearFavourites),
  ]);
}
