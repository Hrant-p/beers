import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
    getAllBeersSucceed,
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

function* getCertainBeer({ payload : { beerId } }) {
    try {
        yield put(setLoadingState(true));
        const { data } = yield call(
            request,
            'GET',
            constructUrl([beerAPI, beerId], {})
        )
        yield put(getAllBeersSucceed(data));
        yield put(setLoadingState(false))

    } catch (e) {
        yield put(setLoadingState(false))
        yield put(requestError(e))
    }
}

function* setPagination({ payload: { pageNumber, perPageNumber} }) {
    try {
        yield put(setLoadingState(true))
        const { data } = yield call(
            request,
            'GET',
            constructUrl([beerAPI], {
                page: pageNumber,
                per_page: perPageNumber
            })
        );
        yield put(getAllBeersSucceed(data));
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
        takeLatest(BEER_ACTION_TYPE.PAGINATION_REQUEST, setPagination)
    ])
}
