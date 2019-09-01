import { BEER_ACTION_TYPE, LOADING_ACTION_TYPE } from "./actionTypes";

export function setLoadingState(isLoading) {
    return {
        type: LOADING_ACTION_TYPE.SET_LOADING_STATE,
        payload: { isLoading }
    }
}

export function getAllBeersRequest() {
   return {
       type: BEER_ACTION_TYPE.GET_ALL_BEERS_REQUEST,
       payload: {}
   }
}

export function getCertainBeerRequest(id, history) {
    return {
        type: BEER_ACTION_TYPE.GET_CERTAIN_BEER,
        payload: { id, history }
    }
}

export function clearBeerDetails(history) {
    return {
        type: BEER_ACTION_TYPE.CLEAR_CERTAIN_BEER,
        payload: { history }
    }
}

export function getRandomBeerRequest() {
    return {
        type: BEER_ACTION_TYPE.GET_RANDOM_BEER,
        payload: {}
    }
}

export function getRandomBeerRequestSuccess(data) {
    return {
        type: BEER_ACTION_TYPE.GET_RANDOM_BEER_SUCCEED,
        payload: { data }
    }
}

export function getCertainBeerRequestSuccess(data) {
   return {
       type: BEER_ACTION_TYPE.GET_CERTAIN_BEER_SUCCEED,
       payload: { data }
   }
}

export function getAllBeersSucceed(data) {
    return {
        type: BEER_ACTION_TYPE.GET_ALL_BEERS_SUCCEED,
        payload: { data }
    }
}

export function getBeersPaginationSucceed(data) {
    return {
        type: BEER_ACTION_TYPE.GET_PAGINATION_BEER_SUCCEED,
        payload: { data }
    }
}

export function getPaginationRequest(perPageNumber, pageNumber) {
    return {
        type: BEER_ACTION_TYPE.PAGINATION_REQUEST,
        payload: { perPageNumber, pageNumber }
    }
}

export function infiniteScrollBeers(perPageNumber, pageNumber) {
    return {
        type: BEER_ACTION_TYPE.INFINITE_SCROLL_BEERS,
        payload: { perPageNumber, pageNumber }
    }
}


export function requestError(errorMessage) {
    return {
        type: BEER_ACTION_TYPE.REQUEST_ERROR_STATE,
        payload: { errorMessage }
    }
}
