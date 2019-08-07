import { searchConstants } from '../constants';

const initialState = { suggestions: [], searchedProducts: [] } 

export function search(state = initialState, action) {
  switch (action.type) {
    case searchConstants.SEARCH_SUGGESTIONS_REQUEST:
      return { 
        suggestions: [],
        searchedProducts: state.searchedProducts,
        gettingSuggestions: true 
      };
    case searchConstants.SEARCH_SUGGESTIONS_SUCCESS:
      return {
        searchedProducts: state.searchedProducts,
        suggestions: action.suggestions
      };
    case searchConstants.SEARCH_SUGGESTIONS_FAILURE:
      return {
        suggestions: [],
        searchedProducts: state.searchedProducts,
        gettingSuggestionsFailed: true
      };
    case searchConstants.SEARCH_PRODUCTS_REQUEST:
      return { 
        searchedProducts: [],
        suggestions: state.suggestions,
        gettingSearchedProducts: true 
      };
    case searchConstants.SEARCH_PRODUCTS_SUCCESS:
      return {
        searchedProducts: action.products,
        suggestions: state.suggestions
      };
    case searchConstants.SEARCH_PRODUCTS_FAILURE:
      return {
        searchedProducts: [],
        suggestions: state.suggestions,
        gettingSearchedProductsFailed: true
      };
    default:
      return state
  }
}