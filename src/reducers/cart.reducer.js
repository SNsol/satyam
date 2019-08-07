import { cartConstants } from '../constants';

const initialState = { cartProducts: [] } 

export function cart(state = initialState, action) {
  switch (action.type) {
    case cartConstants.GET_CART_PRODUCTS_REQUEST: {
      return { 
        cartProducts: [],
        cartProductIds:[],
        totalCartProducts: 0,
        totalPrice: 0,
        gettingCartProducts: true 
      };
    }
    case cartConstants.GET_CART_PRODUCTS_SUCCESS: {
      let products = action.products;
      let productIds = products.map(product => { return product.id; });
      let totalPrice = products.reduce( function(a, b)  { 
        let price = b.price ? b.price : 0;
        let quantity = b.quantity ? b.quantity : 0; 
        return a + (price * quantity); 
      }, 0);
      let totalProducts = products.reduce( function(a, b)  { 
        let quantity = b.quantity ? b.quantity : 0;
        return a + quantity; 
      }, 0);
      return {
        cartProducts: [...products],
        cartProductIds: [...productIds],
        totalCartProducts: totalProducts,
        totalPrice: totalPrice
      };
    }
    case cartConstants.GET_CART_PRODUCTS_FAILURE: {
      return {
        cartProducts: [],
        cartProductIds: [],
        totalCartProducts: 0,
        totalPrice: 0,
        gettingCartProductsFailed: true
      };
    }
    case cartConstants.ADD_CART_REQUEST: {
      return { 
        cartProducts: state.cartProducts,
        cartProductIds: state.cartProductIds,
        totalCartProducts: state.totalCartProducts,
        totalPrice: state.totalPrice,
        addingCartProduct: true 
      };
    }
    case cartConstants.ADD_CART_SUCCESS: {
      let products = [...state.cartProducts, action.product];
      let productIds = [...state.cartProductIds, action.product.id];
      let totalProducts = products.reduce( function(a, b)  { 
        let quantity = b.quantity ? b.quantity : 0;
        return a + quantity; 
      }, 0);
      let totalPrice = products.reduce( function(a, b)  { 
        let price = b.price ? b.price : 0;
        let quantity = b.quantity ? b.quantity : 0; 
        return a + (price * quantity); 
      }, 0);
      return {
        cartProducts: [...products],
        cartProductIds: [...productIds],
        totalCartProducts: totalProducts,
        totalPrice: totalPrice,
        addedToCart: true
      };
    }
    case cartConstants.ADD_CART_FAILURE: {
      return {
        cartProducts: state.cartProducts,
        cartProductIds: state.cartProductIds,
        totalCartProducts: state.totalCartProducts,
        totalPrice: state.totalPrice,
        addingCartProductFailed: true
      };
    }
    case cartConstants.UPDATE_CART_REQUEST: {
      return { 
        cartProducts: state.cartProducts,
        cartProductIds: state.cartProductIds,
        totalCartProducts: state.totalCartProducts,
        totalPrice: state.totalPrice,
        updatingCartProduct: true 
      };
    }
    case cartConstants.UPDATE_CART_SUCCESS: {
      let updatedProducts = state.cartProducts.map(product => {
        if (product.id === action.product.id) {
          return action.product;
        }
        return product;
      });
      let totalProducts = updatedProducts.reduce( function(a, b)  { 
        let quantity = b.quantity ? b.quantity : 0;
        return a + quantity; 
      }, 0);
      let totalPrice = updatedProducts.reduce( function(a, b)  { 
        let price = b.price ? b.price : 0;
        let quantity = b.quantity ? b.quantity : 0; 
        return a + (price * quantity); 
      }, 0);
      return {
        updatedCartProduct: true,
        cartProducts: [...updatedProducts],
        cartProductIds: [...state.cartProductIds],
        totalCartProducts: totalProducts,
        totalPrice: totalPrice
      };
    }
    case cartConstants.UPDATE_CART_FAILURE: {
      return {
        cartProducts: state.cartProducts,
        cartProductIds: state.cartProductIds,
        totalCartProducts: state.totalCartProducts,
        totalPrice: state.totalPrice,
        updatingCartProductFailed: true
      };
    }
    case cartConstants.REMOVE_CART_REQUEST: {
      return { 
        cartProducts: state.cartProducts,
        cartProductIds: state.cartProductIds,
        totalCartProducts: state.totalCartProducts,
        totalPrice: state.totalPrice,
        removingCartProduct: true 
      };
    }
    case cartConstants.REMOVE_CART_SUCCESS: {
      let updatedProducts = state.cartProducts.filter(product => product.id !== action.productId);
      let updatedProductIds = state.cartProductIds.filter(productId => productId !== action.productId);
      let totalProducts = updatedProducts.reduce( function(a, b)  { 
        let quantity = b.quantity ? b.quantity : 0;
        return a + quantity; 
      }, 0);
      let totalPrice = updatedProducts.reduce( function(a, b)  { 
        let price = b.price ? b.price : 0;
        let quantity = b.quantity ? b.quantity : 0; 
        return a + (price * quantity); 
      }, 0);
      return {
        removedCartProduct: true,
        cartProducts: [...updatedProducts],
        cartProductIds: [...updatedProductIds],
        totalCartProducts: totalProducts,
        totalPrice: totalPrice
      };
    }
    case cartConstants.REMOVE_CART_FAILURE: {
      return {
        cartProducts: state.cartProducts,
        cartProductIds: state.cartProductIds,
        totalCartProducts: state.totalCartProducts,
        totalPrice: state.totalPrice,
        removingCartProductFailed: true
      };
    }
    default:
      return state
  }
}