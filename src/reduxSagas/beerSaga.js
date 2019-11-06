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
import {BEER_ACTION_TYPE, SEARCH_ACTION_TYPE} from "../store/actions/actionTypes";
import {searchResultSucceed} from "../store/actions/searchActionCreators";

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
        if (pathname.includes('founded')) {
            yield history.push(`/founded_beers/${id}`)
        } else if (pathname.includes('favourite')) {
            yield history.push(`/favourite/${id}`);
        } else if (pathname.includes('beers')) {
            yield history.push(`/beers/${id}`);
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
        const [ first, second, third ] = yield all([
            call(request,'GET', url),
            call(request,'GET', url),
            call(request,'GET', url),
        ]);
        const randomBeers = yield first.data.concat(second.data, third.data);
        yield put(getRandomBeerRequestSuccess(randomBeers));
        yield put(setLoadingState(false))

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e));
        console.warn(e)
    }
}

function* clearCertainBeer({ payload: { history }}) {
    try {
        yield put(setLoadingState(true));
        yield put(getCertainBeerRequestSuccess([]));
        yield put(getRandomBeerRequestSuccess([]));
        yield put(setLoadingState(false));
        const { pathname } =  yield history.location;
        if (pathname.includes('founded')) {
            yield history.goBack() || history.push('/founded_beers/')
        } else if (pathname.includes('beers')) {
            yield history.push(`/beers`);
        } else if (pathname.includes('favourite')) {
            yield history.push(`/favourite`);
        }

    } catch (e) {
        yield put(setLoadingState(false));
        yield put(requestError(e));
        console.warn(e)
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

function* searchByBeerName({ payload : { name, beers }}) {
    try {
        yield put(setLoadingState(true));
        const str = yield name.toString().toLowerCase();

        let result;
        if (beers && str !== '') {
            result = yield beers.filter(item =>
                item.get('name')
                    .toLowerCase()
                    .includes(str));
            if (result.size < 1) {
                result = yield [str]
            }
        }
        if (!beers || str === '') {
            result = yield []
        }
        yield put(searchResultSucceed(result));
        yield put(setLoadingState(false));

    } catch (e) {
        yield put(setLoadingState(false));
        requestError(e);
        console.log(e)
    }
}

function* advancedSearch({payload: { paramsObj, history }}) {
    try {
        yield put(setLoadingState(true));
        let newObj = yield {};
        let k;
        for(k in paramsObj ) {
            if (paramsObj[k]) {
                newObj[k] = yield paramsObj[k]
            }
        }
        const { data } = yield call(
            request,
            'GET',
            constructUrl([beerAPI], newObj)
        );
        yield put(searchResultSucceed(data));
        yield history.push('/founded_beers');
        yield put(setLoadingState(false));

    } catch (e) {
        yield put(setLoadingState(false));
        requestError(e);
        console.log(e)
    }
}

function* clearSearchAndDetails() {
    try {
        yield put(setLoadingState(true));
        yield put(searchResultSucceed([]));
        yield put(getCertainBeerRequestSuccess([]))
        yield put(setLoadingState(false));
    } catch (e) {
        yield put(setLoadingState(false));
        requestError(e);
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
        takeLatest(SEARCH_ACTION_TYPE.SEARCH_BY_NAME, searchByBeerName),
        takeLatest(SEARCH_ACTION_TYPE.ADVANCED_SEARCH_BY_PARAMETERS, advancedSearch),
        takeLatest(SEARCH_ACTION_TYPE.CLEAR_SEARCH_RESULT_AND_DETAILS, clearSearchAndDetails)
    ])
}
