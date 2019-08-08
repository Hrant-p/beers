import { fromJS } from "immutable";
import { BEER_ACTION_TYPE } from "../actions/actionTypes";

const initialState = fromJS({
    page: 1,
    perPage: 20,
    beers: [],
    isLoading: false,
    error: null
});

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case BEER_ACTION_TYPE.GET_ALL_BEERS_SUCCEED:
            return state.set('beers', fromJS(payload.data));
        case BEER_ACTION_TYPE.SET_BEERS_PER_PAGE:
            return state.set('page', fromJS(payload.pageNumber))
                        .set('perPage', fromJS(payload.perPageNumber));
        case BEER_ACTION_TYPE.GET_BEERS_BY_PAGE:
            return state.set('page', fromJS(payload.pageNumber))
                        .set('perPage', fromJS(payload.perPageNumber));
        case BEER_ACTION_TYPE.REQUEST_ERROR_STATE:
            return state.set('error', fromJS(payload.errorMessage));
        default:
            return state;
    }
}
