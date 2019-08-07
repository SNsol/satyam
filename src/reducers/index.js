import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { registration } from './registration.reducer';
import { forgotPassword } from './forgotPassword.reducer';
import { address } from './address.reducer';
import { search } from './search.reducer';
import { category } from './category.reducer';
import { product } from './product.reducer';
import { productDetail } from './productDetail.reducer';
import { cart } from './cart.reducer';

const rootReducer = combineReducers({
  login,
  registration,
  forgotPassword,
  address,
  search,
  category,
  product,
  productDetail,
  cart
});

export default rootReducer;