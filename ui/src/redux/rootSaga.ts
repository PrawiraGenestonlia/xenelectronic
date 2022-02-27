import { all } from 'redux-saga/effects';
import cartSaga from './carts/cart.saga';
import userSaga from './users/user.saga';
import categoriesSaga from './categories/categories.saga';
import productsSaga from './products/products.saga';

const listOfSagas = [
  cartSaga,
  userSaga,
  categoriesSaga,
  productsSaga
];

export default function* rootSaga() {
  yield all(listOfSagas.map((saga) => saga()));
}
