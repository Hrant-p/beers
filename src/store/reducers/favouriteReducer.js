import { fromJS, List } from "immutable";
import { FAVOURITE_ACTION_TYPE } from "../actions/actionTypes";

const initialState = fromJS({
    favouriteIdList: [],
});

export default function(state = initialState, {type, payload}) {
    switch (type) {
        case FAVOURITE_ACTION_TYPE.SET_NEW_FAVOURITE_LIST:
            return state.set('favouriteIdList', fromJS(payload.listOfId));
        default:
            return state;
    }
}
