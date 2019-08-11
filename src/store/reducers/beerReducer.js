import { fromJS } from "immutable";
import {BEER_ACTION_TYPE, LOADING_ACTION_TYPE} from "../actions/actionTypes";

const initialState = fromJS({
    page: 1,
    perPage: 25,
    beers: [],
    isLoading: false,
    error: null
});

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case BEER_ACTION_TYPE.GET_ALL_BEERS_SUCCEED:
            return state.set('beers', fromJS(payload.data));
        case BEER_ACTION_TYPE.PAGINATION_REQUEST:
            return state.set('page', fromJS(payload.pageNumber))
                .set('perPage', fromJS(payload.perPageNumber));
        case BEER_ACTION_TYPE.REQUEST_ERROR_STATE:
            return state.set('error', fromJS(payload.errorMessage));
        case LOADING_ACTION_TYPE.SET_LOADING_STATE:
                return state.set('isLoading', fromJS(payload.isLoading))
        default:
            return state;
    }
}
