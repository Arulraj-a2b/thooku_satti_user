import {fetchUrl} from '../utility/config';

export const loginApi = fetchUrl('Mobapi/Login');
export const signInApi = fetchUrl('Mobapi/MobileSignUp');
export const calculateLocationDistanceApi = fetchUrl(
  'Mobapi/CalculateLocationDistance',
);

export const getForgotEmailOtpApi = fetchUrl('Mobapi/GetOTP');
export const emailVerifyOtpApi = fetchUrl('Mobapi/ValidateOTP');
export const changePasswordApi = fetchUrl('Mobapi/ChangePassword');
export const getRestaurantListApi = fetchUrl('Mobapi/GetRestaurantList');
export const getFoodItemsApi = fetchUrl('Mobapi/GetFoodItems');
export const getCategoryListApi = fetchUrl('Mobapi/GetCategoryList');
export const addCartApi = fetchUrl('Mobapi/UpdateCart');
export const getCartDetailsApi = fetchUrl('Mobapi/GetCartDetails');
export const deleteCartListApi = fetchUrl('Mobapi/RemoveParticularCartdetails');
export const deleteCartApi = fetchUrl('Mobapi/RemoveCartdetails');
export const checkCartExistApi = fetchUrl('Mobapi/CheckCartExist');
export const checkOutApi = fetchUrl('Mobapi/CheckOut');
export const getTNCApi = fetchUrl('Mobapi/GetTNC');

export const getUpComingOrderApi = fetchUrl('Mobapi/GetUpcomingOrders');
export const getOrderDetailsApi = fetchUrl('Mobapi/GetOrderDetails');
export const getHistoryOrdersApi = fetchUrl('Mobapi/GetHistoryOrders');
export const diningBookingApi = fetchUrl('Mobapi/DiningBooking');

export const getVersionApi = fetchUrl(`Mobapi/GetCurrentVersion`);
export const checkVersionApi = fetchUrl('Mobapi/CheckLatestVersion');


export const aboutApi=fetchUrl('Mobapi/GetAboutus');
export const getDiningListApi=fetchUrl('Mobapi/GetSpecificUserDining')