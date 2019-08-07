import { productConstants } from '../constants';

const initialState = { productDetail: {} } 

export function productDetail(state = initialState, action) {
  switch (action.type) {
    case productConstants.GET_PRODUCT_DETAIL_REQUEST:
      return { 
        productDetail: {},
        gettingProductDetail: true 
      };
    case productConstants.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        productDetail: action.productDetail
      };
    case productConstants.GET_PRODUCT_DETAIL_FAILURE:
      return {
        productDetail: {},
        gettingProductDetailFailed: true
      };
    default:
      return state
  }
}