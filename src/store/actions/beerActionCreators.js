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

export function getCertainBeerRequest(id) {
    return {
        type: BEER_ACTION_TYPE.GET_CERTAIN_BEER,
        payload: { id }
    }
}

export function clearBeerDetails() {
    return {
        type: BEER_ACTION_TYPE.CLEAR_CERTAIN_BEER,
        payload: {}
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

export function getPaginationRequest(pageNumber, perPageNumber) {
    return {
        type: BEER_ACTION_TYPE.PAGINATION_REQUEST,
        payload: {pageNumber, perPageNumber}
    }
}


export function requestError(errorMessage) {
    return {
        type: BEER_ACTION_TYPE.REQUEST_ERROR_STATE,
        payload: { errorMessage }
    }
}
