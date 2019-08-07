import { searchConstants } from '../constants';
import { searchService } from '../services';
import { history } from '../helpers';

export const searchActions = {
  searchSuggestions,
  searchProducts
};

function searchSuggestions(key) {
  return dispatch => {
 	dispatch(request());
	searchService.searchSuggestions(key)
	  .then(
	  	suggestions => { 
	      dispatch(success(suggestions));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: searchConstants.SEARCH_SUGGESTIONS_REQUEST } }
    function success(suggestions) { return { type: searchConstants.SEARCH_SUGGESTIONS_SUCCESS, suggestions } }
    function failure(error) { return { type: searchConstants.SEARCH_SUGGESTIONS_FAILURE, error } }
}

function searchProducts(key) {
  return dispatch => {
 	dispatch(request());
	searchService.searchProducts(key)
	  .then(
	  	products => { 
	      dispatch(success(products));
	    },
	    error => {
	      dispatch(failure(error.toString()));
	    }
	  );
    };

    function request() { return { type: searchConstants.SEARCH_PRODUCTS_REQUEST } }
    function success(products) { return { type: searchConstants.SEARCH_PRODUCTS_SUCCESS, products } }
    function failure(error) { return { type: searchConstants.SEARCH_PRODUCTS_FAILURE, error } }
}