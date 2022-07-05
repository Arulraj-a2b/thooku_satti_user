import {loginReducers} from '../modules/loginmodule/store/loginReducer';
import {
  forgotEamilOtpReducers,
  emailOtpVerifyReducers,
} from '../modules/forgotpasswordmodule/store/forgotReducer';
import {getRestaurantListReducers} from '../modules/homemodule/store/homeReducer';
import {getAddressReducers} from '../modules/mapmodule/store/mapReducer';
import {
  getFoodItemsReducers,
  getCategoryListReducers,
  getCartDetailsReducers,
  addCartReducers
} from '../modules/hotelviewmodule/store/hotelListViewReducer';

export const reducers = {
  loginReducers,
  forgotEamilOtpReducers,
  emailOtpVerifyReducers,
  getRestaurantListReducers,
  getAddressReducers,
  getFoodItemsReducers,
  getCategoryListReducers,
  getCartDetailsReducers,
  addCartReducers
};
