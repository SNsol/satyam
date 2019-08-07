import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import './Product.css';

import { cartActions } from '../../../../actions';
import incrementIcon from '../../../../assets/images/increment.png';
import decrementIcon from '../../../../assets/images/decrement.png';

class Product extends Component {
  constructor(props) {
    super(props);

    let product = this.props.product ? this.props.product : null;
    let cartProductIds = this.props.cartProductIds ? this.props.cartProductIds : [];
    let cartProducts = this.props.cartProducts ? this.props.cartProducts : [];

    let cartProduct = cartProducts.find((element) => {
      return element.id === product.ProductCode;
    })

    var selectedQuantity = 0;
    if (cartProduct) {
      selectedQuantity = cartProduct.quantity ? cartProduct.quantity : 0;
    }

    this.state = {
      product: product,
      addingCartProduct: false,
      addingCartProductFailed: false,
      updatingCartProduct: false,
      updatingCartProductFailed: false,
      removingCartProduct: false,
      removingCartProductFailed: false,
      cartProductIds: cartProductIds,
      cartProducts: cartProducts,
      selectedQuantity: selectedQuantity
    };
    this.onProductClick = this.onProductClick.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.cartView = this.cartView.bind(this);
    this.onQuantityDecrement = this.onQuantityDecrement.bind(this);
    this.onQuantityIncrement = this.onQuantityIncrement.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let addingCartProduct = nextProps.addingCartProduct ? nextProps.addingCartProduct : false;
    let addingCartProductFailed = nextProps.addingCartProductFailed ? nextProps.addingCartProductFailed : false;
    let updatingCartProduct = nextProps.updatingCartProduct ? nextProps.updatingCartProduct : false;
    let updatingCartProductFailed = nextProps.updatingCartProductFailed ? nextProps.updatingCartProductFailed : false;
    let removingCartProduct = nextProps.removingCartProduct ? nextProps.removingCartProduct : false;
    let removingCartProductFailed = nextProps.removingCartProductFailed ? nextProps.removingCartProductFailed : false;
    let cartProductIds = nextProps.cartProductIds ? nextProps.cartProductIds : [];
    let cartProducts = nextProps.cartProducts ? nextProps.cartProducts : [];

    let product = this.props.product;
    let cartProduct = cartProducts.find((element) => {
      return element.id === product.ProductCode;
    })

    var selectedQuantity = 0;
    if (cartProduct) {
      selectedQuantity = cartProduct.quantity ? cartProduct.quantity : 0;
    }
    this.setState({
      addingCartProduct: addingCartProduct,
      addingCartProductFailed: addingCartProductFailed,
      updatingCartProduct: updatingCartProduct,
      updatingCartProductFailed: updatingCartProductFailed,
      removingCartProduct: removingCartProduct,
      removingCartProductFailed: removingCartProductFailed,
      cartProductIds: cartProductIds,
      cartProducts: cartProducts,
      selectedQuantity: selectedQuantity
    });
  }

  onProductClick() {
    let product = this.state.product;
    let path = "/detail/" + product.ProductCode;
    this.props.history.push(path);
  }

  onAddToCart() {
    let product = this.state.product;
    this.props.dispatch(cartActions.addCart(product));
  }

  onQuantityDecrement() {
    let disallowDecrement = (this.state.addingCartProduct) || (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    if (disallowDecrement) {
      return;
    }
    let selectedQuantity = this.state.selectedQuantity - 1;

    if (selectedQuantity <= 0) {
      let product = this.state.product;
      this.props.dispatch(cartActions.removeCart(product.ProductCode));
      return
    }

    this.setState({
      selectedQuantity: selectedQuantity
    });

    let product = this.state.product;
    this.props.dispatch(cartActions.updateCart(product, selectedQuantity));
  }

  onQuantityIncrement() {
    let disallowDecrement = (this.state.addingCartProduct) || (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    if (disallowDecrement) {
      return;
    }

    let selectedQuantity = this.state.selectedQuantity + 1;

    this.setState({
      selectedQuantity: selectedQuantity
    });

    let product = this.state.product;
    this.props.dispatch(cartActions.updateCart(product, selectedQuantity));
  }

  cartView() {
    let product = this.state.product;
    let cartProduct = this.state.cartProducts.find((element) => {
      return element.id === product.ProductCode;
    })

    var addedToCart = false;
    if (cartProduct) {
      addedToCart = true;
    }

    let cartChangeInProgress = (this.state.addingCartProduct) || (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    let selectedQuantity = this.state.selectedQuantity;

    if (addedToCart) {
      return (
        <div className="product-cart-added-view fx fx-c">
          <div className="product-cart-decrement-icon-view" disabled={cartChangeInProgress} onClick={this.onQuantityDecrement}>
            <img src={decrementIcon} className="product-cart-decrement-icon"/>
          </div>
          <div className="product-cart-quantity-label">
            {selectedQuantity}
          </div>
          <div className="product-cart-increment-icon-view" disabled={cartChangeInProgress} onClick={this.onQuantityIncrement}>
            <img src={incrementIcon} className="product-cart-increment-icon"/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="product-cart-add-view">
            <button className="product-cart-add-button" disabled={cartChangeInProgress} onClick={this.onAddToCart}>Add to Cart</button>
        </div>
      );
    }
  }

  render() {
    let product = this.state.product;
    let discount = product.discount ? product.discount : 0;
    let offerPercent = parseInt(discount * 100);

    let cartView = this.cartView();
  	return (
      <div className="product-container">
        <div className="product-image-view fx fx-c" onClick={this.onProductClick}>
           <img src={product.Thumb} className="product-image"/>
        </div>
        <div className="product-offer-view">
          <div className="product-offer-label">
            { offerPercent }% OFF
          </div>
        </div>
        <div className="product-price-view fx fx-space-bw">
          <div className="product-price-label">
            Rs. { product.Sales_rate }
          </div>
          <div className="product-discount-price-label">
            <strike>Rs. { product.BuyPrice }</strike>
          </div>
        </div>
        <div className="product-name-label">
          { product.ProductName }
        </div>
        <div className="product-unit-label">
          { product.UOM }
        </div>
        <div className="product-cart-view fx fx-c">
          { cartView }
        </div>
      </div>
  	);
  }
}

function mapStateToProps(state) {
  const { 
    addingCartProduct, addingCartProductFailed, addedToCart,
    updatingCartProduct, updatingCartProductFailed, updatedCartProduct,
    removingCartProduct, removingCartProductFailed, removedCartProduct,
    cartProductIds, cartProducts 
  } = state.cart;
  return {
    addingCartProduct, addingCartProductFailed, addedToCart, 
    updatingCartProduct, updatingCartProductFailed, updatedCartProduct,
    removingCartProduct, removingCartProductFailed, removedCartProduct,
    cartProductIds, cartProducts
  };
}

const connectedProduct = withRouter(connect(mapStateToProps)(Product));

export { connectedProduct as Product };