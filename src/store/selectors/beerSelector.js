const beerSelector = (state) => state.get('beerReducer');

export const beersSelector = (state) => beerSelector(state).get('beers');
export const isLoadingSelector = (state) => beerSelector(state).get('isLoading');
export const pageSelector = (state) => beerSelector(state).get('page');
export const perPageSelector = (state) => beerSelector(state).get('perPage');
export const detailsSelector = (state) => beerSelector(state).get('details');
export const randomSelector = (state) => beerSelector(state).get('random');
export const errorSelector = (state) => beerSelector(state).get('error');
export const searchSelector = (state) => beerSelector(state).get('searchResult');
