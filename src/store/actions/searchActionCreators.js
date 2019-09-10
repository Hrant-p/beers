import { SEARCH_ACTION_TYPE } from "./actionTypes";

export function searchByName(name, beers) {
    return {
        type: SEARCH_ACTION_TYPE.SEARCH_BY_NAME,
        payload: { name, beers }
    };
}

export function searchResultSucceed(result) {
    return {
        type: SEARCH_ACTION_TYPE.SEARCH_RESULT_SUCCEED,
        payload: { result }
    };
}

export function advancedSearchByParams(paramsObj, history) {
    return {
        type: SEARCH_ACTION_TYPE.ADVANCED_SEARCH_BY_PARAMETERS,
        payload: { paramsObj, history }
    }
}
