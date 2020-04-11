import {
  all, call, put, takeLatest, takeEvery
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

function* setItemLocalStorage(id, bool) {
  const favIds = yield localStorage.getItem('favourites');
  if (favIds) {
    const idArray = yield JSON.parse(favIds);
    const { length } = yield idArray.filter(i => i === id);
    if (!length && bool) {
      yield idArray.push(id);
      yield localStorage.setItem('favourites', JSON.stringify(idArray));
    }
    if (length && !bool) {
      const index = idArray.findIndex(i => i === id);
      const newIdList1 = idArray.slice(0, index);
      const newIdList2 = idArray.slice(index + 1);
      yield localStorage.setItem('favourites', JSON.stringify([...newIdList1, ...newIdList2]));
    }
  } else {
    yield localStorage.setItem('favourites', JSON.stringify([id]));
  }
}

function* addToFavourite({ payload: { beersList, favouriteList, id } }) {
  try {
    yield put(setLoadingState(true));
    const arr = yield beersList.filter((item) => item.get('id') === id);
    const { size } = favouriteList.filter((fav) => fav.get('id') === id);
    if (arr.size > 0 && size < 1) {
      console.log('arr.size > 0 && size < 1');
      yield put(addedToFavouriteListSucceed(arr));
    } else if (arr.size < 1 && size < 1) {
      const { data } = yield call(
        request,
        'GET',
        constructUrl([beerAPI, id], {}),
      );
      console.log('data', data);
      yield put(addedToFavouriteListSucceed(data));
    }
    yield setItemLocalStorage(id, true);
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
      yield setItemLocalStorage(removeId, false);
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
    yield localStorage.removeItem('favourites');
    yield put(setLoadingState(false));
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(requestError(e));
    console.log(e);
  }
}

export function* favouriteSaga() {
  yield all([
    takeEvery(FAVOURITE_ACTION_TYPE.ADD_TO_FAVOURITES, addToFavourite),
    takeLatest(FAVOURITE_ACTION_TYPE.REMOVE_FROM_FAVOURITES, removeFromFavourites),
    takeLatest(FAVOURITE_ACTION_TYPE.CLEAR_FAVOURITE_LIST, clearFavourites),
  ]);
}
