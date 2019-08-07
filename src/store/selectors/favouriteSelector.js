const favouriteSelector = state => state.get('favouriteReducer');

export const favouriteIdListSelector = state => favouriteSelector(state).get('favouriteIdList');
