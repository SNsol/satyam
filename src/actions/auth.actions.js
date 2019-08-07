import { authConstants } from '../constants';
import { authService } from '../services';
import { history } from '../helpers';

export const authActions = {
  createAccount,
  verifyMobile,
  login,
  loginOTP,
  validateLoginOTP,
  forgotPassword,
  validateResetOTP,
  resetPassword,
  logout
};

function createAccount(user) {
  return dispatch => {
 	dispatch(request());
	authService.createAccount(user)
	  .then(
	  	registerDetails => { 
	      dispatch(success(registerDetails));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: authConstants.CREATE_ACCOUNT_REQUEST } }
    function success(registerDetails) { return { type: authConstants.CREATE_ACCOUNT_SUCCESS, registerDetails } }
    function failure(error) { return { type: authConstants.CREATE_ACCOUNT_FAILURE, error } }
}

function verifyMobile(tempToken, otp) {
  return dispatch => {
 	dispatch(request());
	authService.verifyMobile(tempToken, otp)
	  .then(
	  	result => { 
	      dispatch(success());
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: authConstants.VERIFY_MOBILE_REQUEST } }
    function success() { return { type: authConstants.VERIFY_MOBILE_SUCCESS } }
    function failure(error) { return { type: authConstants.VERIFY_MOBILE_FAILURE, error } }
}

function login(username, password) {
  return dispatch => {
 	dispatch(request());
	authService.login(username, password)
	  .then(
	  	user => { 
	      dispatch(success(user));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: authConstants.LOGIN_REQUEST } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function loginOTP(username) {
  return dispatch => {
 	dispatch(request());
	authService.loginOTP(username)
	  .then(
	  	loginOTPDetails => { 
	      dispatch(success(loginOTPDetails));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: authConstants.LOGIN_OTP_REQUEST } }
    function success(loginOTPDetails) { return { type: authConstants.LOGIN_OTP_SUCCESS, loginOTPDetails } }
    function failure(error) { return { type: authConstants.LOGIN_OTP_FAILURE, error } }
}

function validateLoginOTP(tempToken, username, otp) {
  return dispatch => {
 	dispatch(request());
	authService.validateLoginOTP(tempToken, username, otp)
	  .then(
	  	user => { 
	      dispatch(success(user));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: authConstants.VALIDATE_LOGIN_OTP_REQUEST } }
    function success(user) { return { type: authConstants.VALIDATE_LOGIN_OTP_SUCCESS, user } }
    function failure(error) { return { type: authConstants.VALIDATE_LOGIN_OTP_FAILURE, error } }
}

function forgotPassword(username) {
  return dispatch => {
 	dispatch(request());
	authService.forgotPassword(username)
	  .then(
	  	forgotPasswordDetails => { 
	      dispatch(success(forgotPasswordDetails));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: authConstants.FORGOT_PASSWORD_REQUEST } }
    function success(forgotPasswordDetails) { return { type: authConstants.FORGOT_PASSWORD_SUCCESS, forgotPasswordDetails } }
    function failure(error) { return { type: authConstants.FORGOT_PASSWORD_FAILURE, error } }
}

function validateResetOTP(tempToken, otp) {
  return dispatch => {
 	dispatch(request());
	authService.validateResetOTP(tempToken, otp)
	  .then(
	  	result => { 
	      dispatch(success(result));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: authConstants.VALIDATE_RESET_OTP_REQUEST } }
    function success(result) { return { type: authConstants.VALIDATE_RESET_OTP_SUCCESS, result } }
    function failure(error) { return { type: authConstants.VALIDATE_RESET_OTP_FAILURE, error } }
}

function resetPassword(tempToken, newPassword, confirmPassword) {
  return dispatch => {
 	dispatch(request());
	authService.resetPassword(tempToken, newPassword, confirmPassword)
	  .then(
	  	result => { 
	      dispatch(success(result));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: authConstants.RESET_PASSWORD_REQUEST } }
    function success(result) { return { type: authConstants.RESET_PASSWORD_SUCCESS, result } }
    function failure(error) { return { type: authConstants.RESET_PASSWORD_FAILURE, error } }
}

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}