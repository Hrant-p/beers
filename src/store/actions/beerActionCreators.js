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

export function getCertainBeerRequest(beerId) {
   return {
       type: BEER_ACTION_TYPE.GET_CERTAIN_BEER,
       payload: { beerId }
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
