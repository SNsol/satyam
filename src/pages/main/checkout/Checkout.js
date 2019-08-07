import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner';
import './Checkout.css';

import { Header } from '../header';
import { Footer } from '../footer';
import { cartActions } from '../../../actions';
import { workInProgressIcon } from '../../../assets/images/work-in-progress.png';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gettingCartProducts: false,
      cartProducts: [],
      totalPrice: 0
    };

    this.headerView = this.headerView.bind(this);
    this.checkoutListView = this.checkoutListView.bind(this);
    this.noCheckoutView = this.noCheckoutView.bind(this);
    this.loaderView = this.loaderView.bind(this);
    this.onCheckout = this.onCheckout.bind(this);
    this.phoneVerificationView = this.phoneVerificationView.bind(this);
    this.workInProgressView = this.workInProgressView.bind(this);
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
      <div className="checkout-header-view">
        <div className="checkout-header-top-view fx fx-vc">
          <Link to="/" className="checkout-home-link">Home</Link>
          <div className="checkout-tree-arrow">></div>
          <div className="checkout-tree-label">Checkout</div>
        </div>
        <div className="checkout-header-label-view fx fx-vc">
          <div className="checkout-header-label">Checkout</div>
        </div>
      </div>
    );
  }

  loaderView() {
    return (
      <div className="checkout-loader-view fx fx-c">
        <Loader 
          type="ThreeDots"
          color="#FF4D4D"
          height="80" 
          width="80"
        />
      </div>
    );
  }

  noCheckoutView() {
    return (
      <div className="checkout-no-cart-view">
        <div className="checkout-no-cart-label">
          You have no items in cart for checkout..
        </div>
      </div>
    );
  }

  workInProgressView() {
    return (
      <div className="checkout-work-in-progress-view fx fx-c">
        <div className="checkout-work-in-progress-container">
          <div className="checkout-work-in-progress-label">
            WORK IN PROGRESS
          </div>
        </div>
      </div>
    );
  }

  checkoutListView() {
    let cartProducts = this.state.cartProducts;
    if (!Array.isArray(cartProducts)) {
      let noCheckoutView = this.noCheckoutView();
      return (
        <div className="checkout-list-container">
          {noCheckoutView}
        </div>
      );
    }

    if (cartProducts.length <= 0) {
      let noCheckoutView = this.noCheckoutView();
      return (
        <div className="checkout-list-container">
          {noCheckoutView}
        </div>
      );
    }

    let phoneVerificationView = this.phoneVerificationView();

    return (
      <div className="checkout-list-container">
        { phoneVerificationView }
      </div>
    );
  }

  phoneVerificationView() {
    return (
      <div className="phone-verification-view fx">
        <div className="phone-verification-left-view">
        </div>
        <div className="phone-verification-right-view">
        </div>
      </div>
    );
  }

  onCheckout() {
  }

  render() {
  	let headerView = this.headerView();
    let checkoutListView = this.checkoutListView();
    let workInProgressView = this.workInProgressView();
    return (
      <div className="checkout-view">
        <Header />
        <div className="checkout-container-view">
          { headerView }
          <div className="checkout-container mx-auto">
            { workInProgressView }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { 
    gettingCartProducts, gettingCartProductsFailed, cartProducts, totalPrice
   } = state.cart;
  return {
    gettingCartProducts, gettingCartProductsFailed, cartProducts, totalPrice
  };
}

const connectedCheckout = withRouter(connect(mapStateToProps)(Checkout));

export { connectedCheckout as Checkout };
