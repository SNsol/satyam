import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import './CartProduct.css';

import { cartActions } from '../../../../actions';
import incrementIcon from '../../../../assets/images/increment.png';
import decrementIcon from '../../../../assets/images/decrement.png';
import closeButton from '../../../../assets/images/close-button.png';


class CartProduct extends Component {
  constructor(props) {
    super(props);

    let product = this.props.product ? this.props.product : null;

    this.state = {
      product: product,
      updatingCartProduct: false,
      updatingCartProductFailed: false,
      removingCartProduct: false,
      removingCartProductFailed: false
    };
    this.onProductClick = this.onProductClick.bind(this);
    this.cartView = this.cartView.bind(this);
    this.onQuantityDecrement = this.onQuantityDecrement.bind(this);
    this.onQuantityIncrement = this.onQuantityIncrement.bind(this);
    this.onRemoveCart = this.onRemoveCart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let updatingCartProduct = nextProps.updatingCartProduct ? nextProps.updatingCartProduct : false;
    let updatingCartProductFailed = nextProps.updatingCartProductFailed ? nextProps.updatingCartProductFailed : false;
    let removingCartProduct = nextProps.removingCartProduct ? nextProps.removingCartProduct : false;
    let removingCartProductFailed = nextProps.removingCartProductFailed ? nextProps.removingCartProductFailed : false;

    this.setState({
      updatingCartProduct: updatingCartProduct,
      updatingCartProductFailed: updatingCartProductFailed,
      removingCartProduct: removingCartProduct,
      removingCartProductFailed: removingCartProductFailed
    });
  }

  onProductClick() {
    let product = this.state.product;
    let path = "/detail/" + product.ProductCode;
    this.props.history.push(path);
  }

  onQuantityDecrement() {
    let disallowDecrement = (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    if (disallowDecrement) {
      return;
    }
    let product = this.state.product;
    let quantity = product.quantity - 1;

    if (quantity <= 0) {
      this.props.dispatch(cartActions.removeCart(product.id));
      return
    }

    product.quantity = quantity;
    this.setState({
      product: product
    });

    let originalProduct = {
 	  ProductCode: product.id,
 	  Sales_rate: product.price,
 	  BuyPrice: product.originalPrice,
 	  ProductName: product.name,
 	  Thumb: product.thumb
    };

    this.props.dispatch(cartActions.updateCart(originalProduct, quantity));
  }

  onQuantityIncrement() {
    let disallowDecrement = (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    if (disallowDecrement) {
      return;
    }

    let product = this.state.product;
    let quantity = product.quantity + 1;
    product.quantity = quantity;

    this.setState({
      product: product
    });

    let originalProduct = {
 	  ProductCode: product.id,
 	  Sales_rate: product.price,
 	  BuyPrice: product.originalPrice,
 	  ProductName: product.name,
 	  Thumb: product.thumb
    };

    this.props.dispatch(cartActions.updateCart(originalProduct, quantity));
  }

  onRemoveCart(product) {
  	let disallowDecrement = (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    if (disallowDecrement) {
      return;
    }

    this.props.dispatch(cartActions.removeCart(product.id));
  }

  cartView() {
    let product = this.state.product;

    let cartChangeInProgress = (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    let quantity = product.quantity;

    return (
      <div className="cart-item-added-view fx fx-vc">
        <div className="cart-item-decrement-icon-view" disabled={cartChangeInProgress} onClick={this.onQuantityDecrement}>
          <img src={decrementIcon} className="cart-item-decrement-icon"/>
        </div>
        <div className="cart-item-quantity-label">
          {quantity}
        </div>
        <div className="cart-item-increment-icon-view" disabled={cartChangeInProgress} onClick={this.onQuantityIncrement}>
          <img src={incrementIcon} className="cart-item-increment-icon"/>
        </div>
      </div>
    );
  }

  render() {
  	let product = this.state.product;
    let previewImage = product.thumb;
  	let name = product.name ? product.name : '';
    let price = product.price ? product.price : 0;
    let originalPrice = product.originalPrice ? product.originalPrice : 0;
    let discount = product.discount ? product.discount : 0;
    let offerPercent = parseInt(discount * 100);
    let unit = product.unit ? product.unit : '';
    let quantity = product.quantity ? product.quantity : 0;
    let total = quantity * price;

    let cartView = this.cartView();
  	return (
      <div className="cart-item-container-view fx">
      	<div className="cart-item-left-view">
      	  <div className="cart-preview-image-container fx fx-c">
            <img src={previewImage} className="cart-preview-image"/>
          </div>
      	</div>
      	<div className="cart-item-right-view fx">
      	  <div className="cart-item-detail-view">
      	  	<div className="cart-item-name-view">
      	  	  <div className="cart-item-name-label">
      	  	  	{ name }
      	  	  </div>
          	</div>
          	<div className="cart-item-price-view">
      	  	  <div className="cart-item-price-label">
      	      	{ quantity } * Rs. {price} = Rs. {total}
      	  	  </div>
          	</div>
          	<div className="cart-item-cart-view">
      	  	  { cartView }
          	</div>
          </div>
          <div className="cart-delete-view fx fx-hc">
            <img src={closeButton} className="cart-delete-image" onClick={() => this.onRemoveCart(product)}/>
          </div>
      	</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { 
    updatingCartProduct, updatingCartProductFailed, updatedCartProduct,
    removingCartProduct, removingCartProductFailed, removedCartProduct
  } = state.cart;
  return {
    updatingCartProduct, updatingCartProductFailed, updatedCartProduct,
    removingCartProduct, removingCartProductFailed, removedCartProduct
  };
}

const connectedCartProduct = withRouter(connect(mapStateToProps)(CartProduct));

export { connectedCartProduct as CartProduct };