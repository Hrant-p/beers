import { all, call } from 'redux-saga/effects';
import { beerSaga } from "../../reduxSagas/beerSaga";

export default function* middleware() {
    yield all([
        call(beerSaga)
    ])
}
