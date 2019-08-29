import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
    clearBeerDetails,
    getAllBeersSucceed,
    getBeersPaginationSucceed,
    getCertainBeerRequestSuccess,
    getRandomBeerRequestSuccess,
    requestError,
    setLoadingState
} from "../store/actions/beerActionCreators";
import { request } from "../services/requestService";
import { constructUrl } from "../API/helpers";
import { beerAPI } from "../API/apiConsts";
import { BEER_ACTION_TYPE } from "../store/actions/actionTypes";

function* getAllBeers() {
    try {
        yield put(setLoadingState(true));
        const { data } = yield call(
            request,
            'GET',
            constructUrl([beerAPI], {})
        );
        yield put(getAllBeersSucceed(data));
        yield put(setLoadingState(false))

    } catch (e) {
        yield put(setLoadingState(false))
        yield put(requestError(e))
    }
}

function* getCertainBeer({ payload : { id } }) {
    try {
        yield put(setLoadingState(true));
        const { data } = yield call(
            request,
            'GET',
            constructUrl([beerAPI, id], {})
        );
        yield put(getCertainBeerRequestSuccess(data));
        yield put(setLoadingState(false))

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e))
        yield put(getCertainBeerRequestSuccess([]));
    }
}

function* getRandomBeers() {
    try {
        yield put(setLoadingState(true));

        const url = yield constructUrl([beerAPI, 'random'], {})
        const { data } = yield call(request,'GET', url);
        const _data = yield call(request,'GET', url);
        const __data = yield call(request,'GET', url);
        const beerArr = yield [
                ...data,
                ..._data.data,
                ...__data.data
        ];
        yield put(getRandomBeerRequestSuccess(beerArr));
        yield put(setLoadingState(false))

    } catch (e) {
        yield put(setLoadingState(false))
        yield put(requestError(e))
    }
}

function* clearCertainBeer() {
    try {
        yield put(setLoadingState(true));
        yield put(getCertainBeerRequestSuccess([]));
        yield put(getRandomBeerRequestSuccess([]));
        yield put(setLoadingState(false))

    } catch (e) {
        yield put(setLoadingState(false));
        alert(e)
    }
}


function* setPagination({ payload: {perPageNumber,  pageNumber} }) {
    try {
        yield put(setLoadingState(true));
        const { data } = yield call(
            request,
            'GET',
            constructUrl([beerAPI], {
                per_page: perPageNumber,
                page: pageNumber
            })
        );
        yield put(getAllBeersSucceed(data));
        yield put(setLoadingState(false));

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e))
    }
}

function* InfiniteScrollPagination({ payload: {perPageNumber,  pageNumber} }) {
    try {
        yield put(setLoadingState(true));
        const { data } = yield call(
            request,
            'GET',
            constructUrl([beerAPI], {
                per_page: perPageNumber,
                page: pageNumber
            })
        );
        if (data.length > 0) {
            yield put(getBeersPaginationSucceed(data));
        }
        yield put(setLoadingState(false));

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e))
    }
}


export function* beerSaga() {
    yield all([
        takeLatest(BEER_ACTION_TYPE.GET_ALL_BEERS_REQUEST, getAllBeers),
        takeLatest(BEER_ACTION_TYPE.GET_CERTAIN_BEER, getCertainBeer),
        takeLatest(BEER_ACTION_TYPE.GET_RANDOM_BEER, getRandomBeers),
        takeLatest(BEER_ACTION_TYPE.PAGINATION_REQUEST, setPagination),
        takeLatest(BEER_ACTION_TYPE.INFINITE_SCROLL_BEERS, InfiniteScrollPagination),
        takeLatest(BEER_ACTION_TYPE.CLEAR_CERTAIN_BEER, clearCertainBeer),
    ])
}
