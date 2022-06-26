import {fetchUrl} from '../utility/config';

export const loginApi = fetchUrl('Mobapi/Login');
export const signInApi = fetchUrl('Mobapi/MobileSignUp');

export const getForgotEmailOtpApi = fetchUrl('Mobapi/GetOTP');
export const emailVerifyOtpApi = fetchUrl('Mobapi/ValidateOTP');
export const changePasswordApi = fetchUrl('Mobapi/ChangePassword');

