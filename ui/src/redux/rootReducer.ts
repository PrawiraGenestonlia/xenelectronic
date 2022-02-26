import { combineReducers } from 'redux';
import cartReducers from './carts/cart.slice';
import userReducers from './users/user.slice';
import categoriesReducers from './categories/categories.slice';
import productsReducers from './products/products.slice';

export default combineReducers({
  cart: cartReducers,
  user: userReducers,
  categories: categoriesReducers,
  products: productsReducers
});
