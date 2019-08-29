const favouriteSelector = state => state.get('favouriteReducer');

export const favouriteListSelector = state => favouriteSelector(state).get('favouriteList');
