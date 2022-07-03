import {fetchUrl} from '../utility/config';

export const loginApi = fetchUrl('Mobapi/Login');
export const signInApi = fetchUrl('Mobapi/MobileSignUp');

export const getForgotEmailOtpApi = fetchUrl('Mobapi/GetOTP');
export const emailVerifyOtpApi = fetchUrl('Mobapi/ValidateOTP');
export const changePasswordApi = fetchUrl('Mobapi/ChangePassword');
export const getRestaurantListApi = fetchUrl('Mobapi/GetRestaurantList');
export const getFoodItemsApi = fetchUrl('Mobapi/GetFoodItems');
export const getCategoryListApi = fetchUrl('Mobapi/GetCategoryList');
export const addCartApi = fetchUrl('Mobapi/UpdateCart');
export const getCartDetailsApi = fetchUrl('Mobapi/GetCartDetails');
