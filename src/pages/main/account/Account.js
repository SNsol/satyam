import React, { Component } from 'react';
import { connect } from "react-redux";
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom'
import './Account.css';

import { Header } from '../header';
import { Footer } from '../footer';
import { Orders } from './orders';
import { Addresses } from './addresses';
import { authActions } from '../../../actions';

class Account extends Component {
  constructor(props) {
    super(props);

    this.leftView = this.leftView.bind(this);
    this.rightView = this.rightView.bind(this);
    this.onOrdersClick = this.onOrdersClick.bind(this);
    this.onAddressesClick = this.onAddressesClick.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onOrdersClick() {
    this.props.history.push('/account/orders');
  }

  onAddressesClick() {
    this.props.history.push('/account/addresses');
  }

  onLogout() {
    this.props.dispatch(authActions.logout());
    this.props.history.push('/');
  }

  leftView() {
    return (
      <div className="account-left-container">
        <div className="account-left-menu-header fx fx-vc">
          <div className="account-left-menu-header-label">My Account</div>
        </div>
        <div className="account-left-menu-item fx fx-vc" onClick={this.onOrdersClick}>
          <div className="account-left-menu-item-label">
            My Orders
          </div>
        </div>
        <div className="account-left-menu-item fx fx-vc" onClick={this.onAddressesClick}>
          <div className="account-left-menu-item-label">
            My Addresses
          </div>
        </div>
        <div className="account-left-menu-item fx fx-vc" onClick={this.onLogout}>
          <div className="account-left-menu-item-label">
            Logout
          </div>
        </div>
      </div>
    );
  }
  
  rightView() {
    return (
      <div className="account-right-container">
         <Router>
          <Switch>
            <Route exact path="/account" component={Orders} />
            <Route path="/account/orders" component={Orders} />
            <Route path="/account/addresses" component={Addresses} />
          </Switch>
        </Router>
      </div>
    );
  }

  render() {
    let leftView = this.leftView();
    let rightView = this.rightView();
  	return (
      <div className="account-view">
        <Header />
        <div className="account-container-view">
          <div className="account-container mx-auto">
            <div className="account-container-main-view fx">
              <div className="account-left-view">
                { leftView }
              </div>
              <div className="account-right-view">
                { rightView }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
  	);
  }
}

function mapStateToProps(state) {
  return { };
}

const connectedAccount = withRouter(connect(mapStateToProps)(Account));

export { connectedAccount as Account };