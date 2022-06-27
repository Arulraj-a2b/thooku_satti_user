import {loginReducers} from '../modules/loginmodule/store/loginReducer';
import {
  forgotEamilOtpReducers,
  emailOtpVerifyReducers,
} from '../modules/forgotpasswordmodule/store/forgotReducer';
import {getRestaurantListReducers} from '../modules/homemodule/store/homeReducer';

export const reducers = {
  loginReducers,
  forgotEamilOtpReducers,
  emailOtpVerifyReducers,
  getRestaurantListReducers,
};
