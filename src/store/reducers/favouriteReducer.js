import { fromJS } from "immutable";
import { FAVOURITE_ACTION_TYPE } from "../actions/actionTypes";

const initialState = fromJS({
    favouriteList: [],
});

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case FAVOURITE_ACTION_TYPE.ADDED_FAVOURITE_LIST_SUCCEED:
            return state.update('favouriteList', item =>
                item.push(fromJS(...payload.data)));
        case FAVOURITE_ACTION_TYPE.REMOVE_FROM_FAVOURITES_SUCCEED:
            return state.set('favouriteList', fromJS(payload.list));
        default:
            return state;
    }
}
