import { authConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function login(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case authConstants.LOGIN_FAILURE:
      return {
        loggingInFailed: true,
      };
    case authConstants.LOGIN_OTP_REQUEST:
      return {
        loggingOtpIn: true
      }; 
    case authConstants.LOGIN_OTP_SUCCESS:
      return {
        loggedOtpIn: true,
        otpDetails: action.loginOTPDetails
      }; 
    case authConstants.LOGIN_OTP_FAILURE:
      return {
        loggingOtpInFailed: true
      };
    case authConstants.VALIDATE_LOGIN_OTP_REQUEST:
      return {
        otpDetails: state.otpDetails,
        loggingIn: true
      }; 
    case authConstants.VALIDATE_LOGIN_OTP_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      }; 
    case authConstants.VALIDATE_LOGIN_OTP_FAILURE:
      return {
        otpDetails: state.otpDetails,
        loggingInFailed: true
      };
    case authConstants.LOGOUT:
      return {};
    default:
      return state
  }
}