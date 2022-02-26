import { all } from 'redux-saga/effects';
import cartSaga from './cart/cart.saga';
import userSaga from './user/user.saga';

const listOfSagas = [
  cartSaga,
  userSaga
];

export default function* rootSaga() {
  yield all(listOfSagas.map((saga) => saga()));
}
