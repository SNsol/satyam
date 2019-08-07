import { authConstants } from '../constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case authConstants.CREATE_ACCOUNT_REQUEST:
      return { 
        registering: true 
      };
    case authConstants.CREATE_ACCOUNT_SUCCESS:
      return {
        registerDetails: action.registerDetails
      };
    case authConstants.CREATE_ACCOUNT_FAILURE:
      return {
        registeringFailed: true
      };
    case authConstants.VERIFY_MOBILE_REQUEST:
      return { 
        registerDetails: state.registerDetails,
        registering: true 
      };
    case authConstants.VERIFY_MOBILE_SUCCESS:
      return {
        registered: true,
        registerDetails: state.registerDetails,
        user: action.user
      };
    case authConstants.VERIFY_MOBILE_FAILURE:
      return {
        registerDetails: state.registerDetails,
        registeringFailed: true
      };
    default:
      return state
  }
}