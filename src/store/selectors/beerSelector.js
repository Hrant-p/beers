const beerSelector = state => state.get('beerReducer');

export const beersSelector = state => beerSelector(state).get('beers');
export const isLoadingSelector = state => beerSelector(state).get('isLoading');
