import { fromJS } from "immutable";
import {BEER_ACTION_TYPE, LOADING_ACTION_TYPE} from "../actions/actionTypes";

const initialState = fromJS({
    page: 1,
    perPage: 25,
    beers: [],
    details: [],
    random: [],
    isLoading: false,
    error: null
});

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case BEER_ACTION_TYPE.GET_ALL_BEERS_SUCCEED:
            return state.set('beers', fromJS(payload.data));
        case BEER_ACTION_TYPE.PAGINATION_REQUEST:
            return state
                .set('perPage', fromJS(payload.perPageNumber))
                .set('page', fromJS(payload.pageNumber));
        case BEER_ACTION_TYPE.INFINITE_SCROLL_BEERS:
            return state
                .set('perPage', fromJS(payload.perPageNumber))
                .set('page', fromJS(payload.pageNumber));
        case BEER_ACTION_TYPE.GET_PAGINATION_BEER_SUCCEED:
            return state.update('beers', item =>
                fromJS(item.push(...payload.data)));
        case BEER_ACTION_TYPE.GET_CERTAIN_BEER_SUCCEED:
            return state.set('details', fromJS(payload.data));
        case BEER_ACTION_TYPE.GET_RANDOM_BEER_SUCCEED:
            return state.set('random', fromJS(payload.data));
        case BEER_ACTION_TYPE.REQUEST_ERROR_STATE:
            return state.set('error', fromJS(payload.errorMessage));
        case LOADING_ACTION_TYPE.SET_LOADING_STATE:
                return state.set('isLoading', fromJS(payload.isLoading));
        default:
            return state;
    }
}
