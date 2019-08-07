import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import './HeaderAccountMenu.css';

import { authActions } from '../../../../actions';

class HeaderAccountMenu extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onMyAddressesClick = this.onMyAddressesClick.bind(this);
    this.onMyOrdersClick = this.onMyOrdersClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  onLogout() {
    this.props.dispatch(authActions.logout());
    this.props.history.push('/');
  }

  onMyAddressesClick() {
    this.props.history.push('/account/addresses');
  }

  onMyOrdersClick() {
    this.props.history.push('/account/orders');
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.onClickOutside();
  }

  onClickOutside() {
    this.props.onClickOutside();
  }

  render() {
  	return (
      <div className="header-account-menu-container" ref={node => { this.node = node; }}>
        <div className="header-account-menu-item-view fx fx-vc" onClick={this.onMyOrdersClick}>
          <div className="header-account-menu-button">My Orders</div>
        </div>
        <div className="header-account-menu-item-view fx fx-vc" onClick={this.onMyAddressesClick}>
          <div className="header-account-menu-button">My Addresses</div>
        </div>
        <div className="header-account-menu-item-view fx fx-vc" onClick={this.onLogout}>
      		<div className="header-account-menu-button">LOGOUT</div>
      	</div>
      </div>
  	);
  }
}

function mapStateToProps(state) {
  return { };
}

const connectedHeaderAccountMenu = withRouter(connect(mapStateToProps)(HeaderAccountMenu));

export { connectedHeaderAccountMenu as HeaderAccountMenu };