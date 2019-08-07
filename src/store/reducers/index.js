import { combineReducers } from 'redux-immutable';
import beerReducer from './beerReducer';
import favouriteReducer from './favouriteReducer';

export default combineReducers({
    beerReducer,
    favouriteReducer
});
