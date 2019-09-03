import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
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
        yield put(setLoadingState(false));
        yield put(requestError(e))
    }
}

function* getCertainBeer({ payload : { id, history }}) {
    try {
        yield put(setLoadingState(true));
        const { data } = yield call(
            request,
            'GET',
            constructUrl([beerAPI, id], {})
        );
        yield put(getCertainBeerRequestSuccess(data));
        yield put(setLoadingState(false));
        const { pathname } = yield history.location;
        if (pathname.includes('beers')) {
            yield history.push(`/beers/${id}`);
        } else if (pathname.includes('favourite')) {
            yield history.push(`/favourite/${id}`);
        }

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e));
        yield put(getCertainBeerRequestSuccess([]));
        console.log(e)
    }
}

function* getRandomBeers() {
    try {
        yield put(setLoadingState(true));

        const url = yield constructUrl([beerAPI, 'random'], {});
        const { data } = yield call(request,'GET', url);
        const _data = yield call(request,'GET', url);
        const __data = yield call(request,'GET', url);
        const randomBeers = yield data.concat(_data.data, __data.data);
        yield put(getRandomBeerRequestSuccess(randomBeers));
        yield put(setLoadingState(false))

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e))
        console.log(e)
    }
}

function* clearCertainBeer({ payload: { history }}) {
    try {
        yield put(setLoadingState(true));
        yield put(getCertainBeerRequestSuccess([]));
        yield put(getRandomBeerRequestSuccess([]));
        yield put(setLoadingState(false))
        if (history.location.pathname.includes('beers')) {
            yield history.push(`/beers`);
        } else if (history.location.pathname.includes('favourite')) {
            yield history.push(`/favourite`);
        }

    } catch (e) {
        yield put(setLoadingState(false));
        console.log(e)
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
        yield put(requestError(e));
        console.log(e)
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
        yield put(requestError(e));
        console.log(e)
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
