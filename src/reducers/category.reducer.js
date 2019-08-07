import { productConstants } from '../constants';

const initialState = { categories: [], subcategories: [], bestSelling: [], topSelling: [] } 

export function category(state = initialState, action) {
  switch (action.type) {
    case productConstants.GET_DASHBOARD_DETAILS_REQUEST:
      return {
        categories: [],
        subcategories: [],
        bestSelling: [],
        topSelling: [],
        gettingDashboardDetails: true 
      };
    case productConstants.GET_DASHBOARD_DETAILS_SUCCESS:
      return {
        categories: action.result.categories,
        bestSelling: action.result.bestSelling,
        topSelling: action.result.topSelling,
        subcategories: [],
        gettingDashboardDetailsSuccess: true
      };
    case productConstants.GET_DASHBOARD_DETAILS_FAILURE:
      return {
        categories: [],
        subcategories: [],
        bestSelling: [],
        topSelling: [],
        gettingDashboardDetailsFailed: true
      };
    case productConstants.GET_SUBCATEGORIES_REQUEST:
      return {
        categories: state.categories,
        bestSelling: state.bestSelling,
        topSelling: state.topSelling,
        subcategories: [],
        gettingSubcategories: true 
      };
    case productConstants.GET_SUBCATEGORIES_SUCCESS:
      return {
        categories: state.categories,
        bestSelling: state.bestSelling,
        topSelling: state.topSelling,
        subcategories: action.subcategories
      };
    case productConstants.GET_SUBCATEGORIES_FAILURE:
      return {
        categories: state.categories,
        bestSelling: state.bestSelling,
        topSelling: state.topSelling,
        subcategories: [],
        gettingSubcategoriesFailed: true
      };
    default:
      return state
  }
}