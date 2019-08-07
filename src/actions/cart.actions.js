import { cartConstants } from '../constants';
import { cartService } from '../services';
import { history } from '../helpers';

export const cartActions = {
  cartProducts,
  addCart,
  updateCart,
  removeCart
};

function cartProducts() {
  return dispatch => {
 	dispatch(request());
	cartService.cartProducts()
	  .then(
	  	products => { 
	      dispatch(success(products));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: cartConstants.GET_CART_PRODUCTS_REQUEST } }
    function success(products) { return { type: cartConstants.GET_CART_PRODUCTS_SUCCESS, products } }
    function failure(error) { return { type: cartConstants.GET_CART_PRODUCTS_FAILURE, error } }
}

function addCart(product) {
  return dispatch => {
 	dispatch(request());
	cartService.addCart(product)
	  .then(
	  	addedProduct => { 
	      dispatch(success(addedProduct));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: cartConstants.ADD_CART_REQUEST } }
    function success(product) { return { type: cartConstants.ADD_CART_SUCCESS, product } }
    function failure(error) { return { type: cartConstants.ADD_CART_FAILURE, error } }
}

function updateCart(product, productCount) {
  return dispatch => {
 	dispatch(request());
	cartService.updateCart(product, productCount)
	  .then(
	  	updatedProduct => { 
	      dispatch(success(updatedProduct));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: cartConstants.UPDATE_CART_REQUEST } }
    function success(product) { return { type: cartConstants.UPDATE_CART_SUCCESS, product } }
    function failure(error) { return { type: cartConstants.UPDATE_CART_FAILURE, error } }
}

function removeCart(productId) {
  return dispatch => {
 	dispatch(request());
	cartService.removeCart(productId)
	  .then(
	  	productId => { 
	      dispatch(success(productId));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: cartConstants.REMOVE_CART_REQUEST } }
    function success(productId) { return { type: cartConstants.REMOVE_CART_SUCCESS, productId } }
    function failure(error) { return { type: cartConstants.REMOVE_CART_FAILURE, error } }
}