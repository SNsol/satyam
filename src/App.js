import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from './PrivateRoute';
import OtpRefreshRoute from './OtpRefreshRoute';
import RegisterRefreshRoute from './RegisterRefreshRoute';
import ForgotPasswordRefreshRoute from './ForgotPasswordRefreshRoute';
import './App.css';

import { Main } from './pages/main';
import { CreateAccount } from './pages/authentication/create-account';
import { VerifyMobile } from './pages/authentication/verify-mobile';
import { Login } from './pages/authentication/login';
import { VerifyLoginOTP } from './pages/authentication/verify-login-otp';
import { ForgotPassword } from './pages/authentication/forgot-password';
import { VerifyOTP } from './pages/authentication/verify-otp';
import { ResetPassword } from './pages/authentication/reset-password';
import { SearchResults } from './pages/main/search/search-results';
import { ViewProducts } from './pages/main/product/view-products';
import { ProductDetail } from './pages/main/product/product-detail';
import { Account } from './pages/main/account';
import { Cart } from './pages/main/cart';
import { Checkout } from './pages/main/checkout';

import { cartActions } from './actions';

class App extends Component {
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.props.dispatch(cartActions.cartProducts());
    }
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
    		    <PrivateRoute exact path="/" component={Main} />
            <Route path="/create-account" component={CreateAccount} />
            <RegisterRefreshRoute path="/verify-mobile" component={VerifyMobile} />
    		    <Route path="/login" component={Login} />
            <OtpRefreshRoute path="/verify-login-otp" component={VerifyLoginOTP} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <ForgotPasswordRefreshRoute path="/verify-otp" component={VerifyOTP} />
            <ForgotPasswordRefreshRoute path="/reset-password" component={ResetPassword} />
            <PrivateRoute path="/search/:key" component={SearchResults} />
            <PrivateRoute path="/category/:name/:id" component={ViewProducts} />
            <PrivateRoute path="/detail/:id" component={ProductDetail} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/checkout" component={Checkout} />
          </Switch>
      	</Router>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

const connectedApp = connect(mapStateToProps)(App);

export { connectedApp as App };