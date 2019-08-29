import { all, call } from 'redux-saga/effects';
import { beerSaga } from "../../reduxSagas/beerSaga";
import { favouriteSaga } from "../../reduxSagas/favouriteSaga";

export default function* middleware() {
    yield all([
        call(beerSaga),
        call(favouriteSaga)
    ])
}
