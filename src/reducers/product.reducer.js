import { productConstants } from '../constants';

const initialState = { products: [] } 

export function product(state = initialState, action) {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_CATEGORY_REQUEST:
      return { 
        products: [],
        gettingProducts: true 
      };
    case productConstants.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        products: action.products
      };
    case productConstants.GET_PRODUCTS_BY_CATEGORY_FAILURE:
      return {
        products: [],
        gettingProductsFailed: true
      };
    case productConstants.GET_PRODUCTS_BY_SUBCATEGORY_REQUEST:
      return { 
        products: [],
        gettingProducts: true 
      };
    case productConstants.GET_PRODUCTS_BY_SUBCATEGORY_SUCCESS:
      return {
        products: action.products
      };
    case productConstants.GET_PRODUCTS_BY_SUBCATEGORY_FAILURE:
      return {
        products: [],
        gettingProductsFailed: true
      };
    default:
      return state
  }
}