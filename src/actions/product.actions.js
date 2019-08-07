import { productConstants } from '../constants';
import { productService } from '../services';
import { history } from '../helpers';

export const productActions = {
  dashboardDetails,
  subcategories,
  productsForCategory,
  productsForSubcategory,
  productDetail
};

function dashboardDetails() {
  return dispatch => {
 	dispatch(request());
	productService.dashboardDetails()
	  .then(
	  	result => { 
	      dispatch(success(result));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: productConstants.GET_DASHBOARD_DETAILS_REQUEST } }
    function success(result) { return { type: productConstants.GET_DASHBOARD_DETAILS_SUCCESS, result } }
    function failure(error) { return { type: productConstants.GET_DASHBOARD_DETAILS_FAILURE, error } }
}

function subcategories(categoryId) {
  return dispatch => {
 	dispatch(request());
	productService.subcategories(categoryId)
	  .then(
	  	subcategories => { 
	      dispatch(success(subcategories));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: productConstants.GET_SUBCATEGORIES_REQUEST } }
    function success(subcategories) { return { type: productConstants.GET_SUBCATEGORIES_SUCCESS, subcategories } }
    function failure(error) { return { type: productConstants.GET_SUBCATEGORIES_FAILURE, error } }
}

function productsForCategory(categoryId) {
  return dispatch => {
 	dispatch(request());
	productService.productsForCategory(categoryId)
	  .then(
	  	products => { 
	      dispatch(success(products));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: productConstants.GET_PRODUCTS_BY_CATEGORY_REQUEST } }
    function success(products) { return { type: productConstants.GET_PRODUCTS_BY_CATEGORY_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GET_PRODUCTS_BY_CATEGORY_FAILURE, error } }
}

function productsForSubcategory(subcategoryId) {
  return dispatch => {
 	dispatch(request());
	productService.productsForSubcategory(subcategoryId)
	  .then(
	  	products => { 
	      dispatch(success(products));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: productConstants.GET_PRODUCTS_BY_SUBCATEGORY_REQUEST } }
    function success(products) { return { type: productConstants.GET_PRODUCTS_BY_SUBCATEGORY_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GET_PRODUCTS_BY_SUBCATEGORY_FAILURE, error } }
}

function productDetail(productId) {
  return dispatch => {
 	dispatch(request());
	productService.productDetail(productId)
	  .then(
	  	productDetail => { 
	      dispatch(success(productDetail));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: productConstants.GET_PRODUCT_DETAIL_REQUEST } }
    function success(productDetail) { return { type: productConstants.GET_PRODUCT_DETAIL_SUCCESS, productDetail } }
    function failure(error) { return { type: productConstants.GET_PRODUCT_DETAIL_FAILURE, error } }
}