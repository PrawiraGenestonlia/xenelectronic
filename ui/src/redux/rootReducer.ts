import { combineReducers } from 'redux';
import cartReducers from './cart/cart.slice';
import userReducers from './user/user.slice';

export default combineReducers({
  cart: cartReducers,
  user: userReducers
});
