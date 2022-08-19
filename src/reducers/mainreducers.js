import {
  loginReducers,
  calculateLocationDistanceReducers,
  getCurrentVersionReducers,
  aboutReducers,
} from '../modules/loginmodule/store/loginReducer';
import {
  forgotEamilOtpReducers,
  emailOtpVerifyReducers,
} from '../modules/forgotpasswordmodule/store/forgotReducer';
import {
  getRestaurantListReducers,
  checkLatestVersionReducers,
  getHomeDashboardReducers,
  searchRestaurantandItemsReducers,
} from '../modules/homemodule/store/homeReducer';
import {getAddressReducers} from '../modules/mapmodule/store/mapReducer';
import {
  getFoodItemsReducers,
  getCategoryListReducers,
  getCartDetailsReducers,
  addCartReducers,
} from '../modules/hotelviewmodule/store/hotelListViewReducer';
import {
  checkOutReducers,
  checkCartExistReducers,
  getTNCReducers,
} from '../modules/mycartmodule/store/myCartReducer';
import {
  getUpComingOrderReducers,
  getOrderDetailsReducers,
  getHistoryOrdersReducers,
  getDiningListReducers,
  getDiningDetailsReducers,
} from '../modules/myordermodule/store/myOrderReducer';
import {
  getCustomerInfoReducers,
  getMarketOrderReducers,
  saveMarketOrderReducers,
  getMarketOrderListReducers,
} from '../modules/marketmodule/store/marketOrderScreenReducer';
import {getDiningHotelListReducers} from '../modules/bookingmodule/store/tableBookingReducer';

export const reducers = {
  loginReducers,
  forgotEamilOtpReducers,
  emailOtpVerifyReducers,
  getRestaurantListReducers,
  getAddressReducers,
  getFoodItemsReducers,
  getCategoryListReducers,
  getCartDetailsReducers,
  addCartReducers,
  checkOutReducers,
  getUpComingOrderReducers,
  getOrderDetailsReducers,
  getHistoryOrdersReducers,
  checkCartExistReducers,
  getTNCReducers,
  calculateLocationDistanceReducers,
  getCurrentVersionReducers,
  checkLatestVersionReducers,
  aboutReducers,
  getDiningListReducers,
  getDiningDetailsReducers,
  getHomeDashboardReducers,
  searchRestaurantandItemsReducers,
  getCustomerInfoReducers,
  getMarketOrderReducers,
  saveMarketOrderReducers,
  getMarketOrderListReducers,
  getDiningHotelListReducers,
};
