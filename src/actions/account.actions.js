import { accountConstants } from '../constants';
import { accountService } from '../services';
import { history } from '../helpers';

export const accountActions = {
  getAddresses,
  addAddress,
  updateAddress,
  removeAddress
};

function getAddresses() {
  return dispatch => {
 	dispatch(request());
	accountService.getAddresses()
	  .then(
	  	addresses => { 
	      dispatch(success(addresses));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: accountConstants.GET_ADDRESSES_REQUEST } }
    function success(addresses) { return { type: accountConstants.GET_ADDRESSES_SUCCESS, addresses } }
    function failure(error) { return { type: accountConstants.GET_ADDRESSES_FAILURE, error } }
}

function addAddress(address) {
  return dispatch => {
 	dispatch(request());
	accountService.addAddress(address)
	  .then(
	  	address => { 
	      dispatch(success(address));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: accountConstants.ADD_ADDRESS_REQUEST } }
    function success(address) { return { type: accountConstants.ADD_ADDRESS_SUCCESS, address } }
    function failure(error) { return { type: accountConstants.ADD_ADDRESS_FAILURE, error } }
}

function updateAddress(address) {
  return dispatch => {
 	dispatch(request());
	accountService.updateAddress(address)
	  .then(
	  	address => { 
	      dispatch(success(address));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: accountConstants.UPDATE_ADDRESS_REQUEST } }
    function success(address) { return { type: accountConstants.UPDATE_ADDRESS_SUCCESS, address } }
    function failure(error) { return { type: accountConstants.UPDATE_ADDRESS_FAILURE, error } }
}

function removeAddress(addressId) {
  return dispatch => {
 	dispatch(request());
	accountService.removeAddress(addressId)
	  .then(
	  	addressId => { 
	      dispatch(success(addressId));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: accountConstants.REMOVE_ADDRESS_REQUEST } }
    function success(addressId) { return { type: accountConstants.REMOVE_ADDRESS_SUCCESS, addressId } }
    function failure(error) { return { type: accountConstants.REMOVE_ADDRESS_FAILURE, error } }
}