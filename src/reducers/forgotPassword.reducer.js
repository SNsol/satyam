import { authConstants } from '../constants';

export function forgotPassword(state = {}, action) {
  switch (action.type) {
    case authConstants.FORGOT_PASSWORD_REQUEST:
      return { 
        forgotPasswordInProgress: true 
      };
    case authConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        forgotPasswordDetails: action.forgotPasswordDetails
      };
    case authConstants.FORGOT_PASSWORD_FAILURE:
      return {
        forgotPasswordFailed: true
      };
    case authConstants.VALIDATE_RESET_OTP_REQUEST:
      return { 
        forgotPasswordDetails: state.forgotPasswordDetails,
        forgotPasswordInProgress: true 
      };
    case authConstants.VALIDATE_RESET_OTP_SUCCESS:
      return {
        forgotPasswordDetails: state.forgotPasswordDetails,
        forgotPasswordOtpResetted: true
      };
    case authConstants.VALIDATE_RESET_OTP_FAILURE:
      return {
        forgotPasswordDetails: state.forgotPasswordDetails,
        forgotPasswordFailed: true
      };
    case authConstants.RESET_PASSWORD_REQUEST:
      return { 
        forgotPasswordDetails: state.forgotPasswordDetails,
        forgotPasswordInProgress: true 
      };
    case authConstants.RESET_PASSWORD_SUCCESS:
      return {
        forgotPasswordDetails: state.forgotPasswordDetails,
        forgotPasswordPasswordResetted: true
      };
    case authConstants.RESET_PASSWORD_FAILURE:
      return {
        forgotPasswordDetails: state.forgotPasswordDetails,
        forgotPasswordFailed: true
      };
    default:
      return state
  }
}