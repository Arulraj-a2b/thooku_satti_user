import {fetchUrl} from '../utility/config';

export const loginApi = fetchUrl('Login');
export const signInApi = fetchUrl('MobileSignUp');
export const calculateLocationDistanceApi = fetchUrl(
  'CalculateLocationDistance',
);

export const getHomeDashboardApi = fetchUrl('HomeDashBoard');
export const getForgotEmailOtpApi = fetchUrl('GetOTP');
export const emailVerifyOtpApi = fetchUrl('ValidateOTP');
export const changePasswordApi = fetchUrl('ChangePassword');
export const getRestaurantListApi = fetchUrl('GetRestaurantList');
export const getFoodItemsApi = fetchUrl('GetFoodItems');
export const getCategoryListApi = fetchUrl('GetCategoryList');
export const addCartApi = fetchUrl('UpdateCart');
export const getCartDetailsApi = fetchUrl('GetCartDetails');
export const deleteCartListApi = fetchUrl('RemoveParticularCartdetails');
export const deleteCartApi = fetchUrl('RemoveCartdetails');
export const checkCartExistApi = fetchUrl('CheckCartExist');
export const checkOutApi = fetchUrl('CheckOut');
export const getTNCApi = fetchUrl('GetTNC');

export const getUpComingOrderApi = fetchUrl('GetUpcomingOrders');
export const getOrderDetailsApi = fetchUrl('GetOrderDetails');
export const getHistoryOrdersApi = fetchUrl('GetHistoryOrders');
export const diningBookingApi = fetchUrl('DiningBooking');
export const getDiningDetailsApi = fetchUrl(`GetSpecificDining`);

export const getVersionApi = fetchUrl(`GetCurrentVersion`);
export const checkVersionApi = fetchUrl('CheckLatestVersion');

export const aboutApi = fetchUrl('GetAboutus');
export const getDiningListApi = fetchUrl('GetSpecificUserDining');
export const uploadBillApi = fetchUrl(`UploadBill`);
export const searchRestaurantandItemsApi = fetchUrl('SearchRestaurantandItems');
