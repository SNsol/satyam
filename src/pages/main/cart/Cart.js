import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner';
import './Cart.css';

import { Header } from '../header';
import { Footer } from '../footer';
import { CartProduct } from './cart-product';
import { treeArrowIcon } from '../../../assets/images/tree-arrow.png';
import { cartActions } from '../../../actions';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gettingCartProducts: false,
      cartProducts: [],
      totalPrice: 0
    };

    this.headerView = this.headerView.bind(this);
    this.cartListView = this.cartListView.bind(this);
    this.checkoutView = this.checkoutView.bind(this);
    this.onCheckout = this.onCheckout.bind(this);
    this.cartListItemView = this.cartListItemView.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(cartActions.cartProducts());
  }

  componentWillReceiveProps(nextProps) {
    let gettingCartProducts = nextProps.gettingCartProducts ? nextProps.gettingCartProducts : false;
    let cartProducts = nextProps.cartProducts ? nextProps.cartProducts : [];
    let totalPrice = nextProps.totalPrice ? nextProps.totalPrice : 0;
    this.setState({
      gettingCartProducts: gettingCartProducts,
      cartProducts: cartProducts,
      totalPrice: totalPrice
    });
  }

  headerView() {
    return (
      <div className="cart-header-view">
        <div className="cart-header-top-view fx fx-vc">
          <Link to="/" className="cart-home-link">Home</Link>
          <div className="cart-tree-arrow">></div>
          <div className="cart-tree-label">Cart</div>
        </div>
        <div className="cart-header-label-view fx fx-vc">
          <div className="cart-header-label">Your items in Cart</div>
        </div>
      </div>
    );
  }

  loaderView() {
    return (
      <div className="cart-loader-view fx fx-c">
        <Loader 
          type="ThreeDots"
          color="#FF4D4D"
          height="80" 
          width="80"
        />
      </div>
    );
  }

  noCartView() {
    return (
      <div className="cart-no-cart-view">
        <div className="cart-no-cart-label">
          You have no items in cart..
        </div>
      </div>
    );
  }

  cartListItemView(products) {
  	var self = this;
    let cartListDom = products.map(function(product) {
      return (
        <div className="cart-item-view" key={product.id}>
          <CartProduct product={product} />
        </div>
      )
    });

  	return (
      <div className="cart-list-item-container">
        { cartListDom }
      </div>
    );
  }

  checkoutView() {
  	let totalPrice = this.state.totalPrice ? this.state.totalPrice : 0;
	   return (
      <div className="cart-checkout-view">
      	<div className="cart-checkout-container">
	      	<div className="cart-total-price-view">
	      	  <div className="cart-total-price-label">
	      	  	Total Price = Rs. {totalPrice}
	      	  </div>
	      	</div>
	      	<div className="cart-checkout-button-view">
	      	  <button className="cart-checkout-button" onClick={this.onCheckout}>Proceed to Checkout</button>
	      	</div>
      	</div>
      </div>
    );
  }

  cartListView() {
  	let cartProducts = this.state.cartProducts;
    if (!Array.isArray(cartProducts)) {
      let noCartView = this.noCartView();
      return (
        <div className="cart-list-container">
          {noCartView}
        </div>
      );
    }

    if (cartProducts.length <= 0) {
      let noCartView = this.noCartView();
      return (
        <div className="cart-list-container">
          {noCartView}
        </div>
      );
    }

    let cartListItemView = this.cartListItemView(cartProducts);
    let checkoutView = this.checkoutView();
    return (
      <div className="cart-list-container">
        { cartListItemView }
        { checkoutView }
      </div>
    );
  }

  onCheckout() {
    this.props.history.push('/checkout');
  }

  render() {
  	let headerView = this.headerView();
  	let cartListView = this.cartListView();
  	return (
      <div className="cart-view">
      	<Header />
      	<div className="cart-container-view">
      	  { headerView }
      	  <div className="cart-container mx-auto">
      	    { cartListView }
      	  </div>
      	</div>
      	<Footer />
      </div>
  	);
  }
}

function mapStateToProps(state) {
  const { 
  	gettingCartProducts, gettingCartProductsFailed, cartProducts, totalPrice,
  	updatingCartProduct, updatingCartProductFailed, updatedCartProduct,
    removingCartProduct, removingCartProductFailed, removedCartProduct,
   } = state.cart;
  return {
    gettingCartProducts, gettingCartProductsFailed, cartProducts, totalPrice,
    updatingCartProduct, updatingCartProductFailed, updatedCartProduct,
    removingCartProduct, removingCartProductFailed, removedCartProduct
  };
}

const connectedCart = withRouter(connect(mapStateToProps)(Cart));

export { connectedCart as Cart };
