import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import './Header.css';

import { SearchSuggestions } from '../search/search-suggestions';
import { HeaderAccountMenu } from './header-account-menu';
import { searchActions } from '../../../actions';

import satyamLogo from '../../../assets/images/satyam-logo.png';
import cartIcon from '../../../assets/images/cart-icon.png';
import cartBadgeIcon from '../../../assets/images/cart-badge-icon.png';
import dropdownIcon from '../../../assets/images/dropdown-icon.png';
import accountIcon from '../../../assets/images/account-icon.png';
import searchIcon from '../../../assets/images/search-icon.png';

class Header extends Component {
  constructor(props) {
    super(props);

    let user = this.props.user ? this.props.user : {};
    let totalCartProducts = this.props.totalCartProducts ? this.props.totalCartProducts : 0;
    this.state = {
      gettingSuggestions: false,
      suggestions: [],
      searchFocused: false,
      searchText: '',
      searchTyping: false,
      searchTypingTimeout: 0,
      showAccountMenu: false,
      user: user,
      totalCartProducts: totalCartProducts
    };

    this.onLogoClick = this.onLogoClick.bind(this);
    this.onCartClick = this.onCartClick.bind(this);
    this.onSearchFocus = this.onSearchFocus.bind(this);
    this.onSearchBlur = this.onSearchBlur.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.onSuggestionSearchClick = this.onSuggestionSearchClick.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSuggestionClickOutside = this.onSuggestionClickOutside.bind(this);
    this.hideAccountMenu = this.hideAccountMenu.bind(this);
    this.showAccountMenu = this.showAccountMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let gettingSuggestions = nextProps.gettingSuggestions ? true : false;
    let suggestions = nextProps.suggestions ? nextProps.suggestions : [];
    let user = nextProps.user ? nextProps.user : {};
    let totalCartProducts = nextProps.totalCartProducts ? nextProps.totalCartProducts : 0;
    this.setState({
      gettingSuggestions: gettingSuggestions,
      suggestions: suggestions,
      user: user,
      totalCartProducts: totalCartProducts
    });
  }

  onLogoClick() {
    this.props.history.push('/');
  }

  onCartClick() {
    this.props.history.push('/cart');
  }

  onSearchFocus() {
    this.setState(prevState => ({
      searchFocused: true
    }));
  }

  onSearchBlur() {
  }

  onSearchChange(event) {
    if (this.state.searchTypingTimeout) {
      clearTimeout(this.state.searchTypingTimeout);
    }
    const self = this;
    this.setState({
      searchText: event.target.value,
      searchTyping: false,
      searchTypingTimeout: setTimeout(function () {
        self.searchProducts(self.state.searchText);
      }, 1000)
    });
  }

  onSuggestionSearchClick(item) {
    let name = item.ProductName ? item.ProductName : "";
    this.setState(prevState => ({
      searchText: name,
      searchFocused: false
    }));
  }

  onSearchClick() {
    this.setState(prevState => ({
      searchText: '',
      searchFocused: false
    }));
    let key = this.state.searchText ? this.state.searchText : "";
    if (key.length <= 0) {
      return;
    }
    let path = "/search/" + key;
    this.props.history.push(path);
  }

  onSuggestionClickOutside() {
  }

  showAccountMenu() {
    this.setState(prevState => ({
      showAccountMenu: true
    }));
  }

  hideAccountMenu() {
  }

  searchProducts(text) {
    var key = text ? text : "";
    if (key.length > 0) {
      this.props.dispatch(searchActions.searchSuggestions(key));
    }
  }

  searchBar() {
    let dropdownClass = this.state.searchFocused ? "header-search-dropdown" : "header-search-dropdown hidden";
    var suggestions = [];
    if (this.state.searchText.length > 0) {
      suggestions = this.state.suggestions ? this.state.suggestions : [];
    }
    let searchAPILoading = this.state.gettingSuggestions;
    let searchText = this.state.searchText;

    return (
      <div className="header-search-bar">
        <div className="header-search-container fx">
          <input className="header-search-input" 
            placeholder="Search"
            value={this.state.searchText} 
            onFocus={this.onSearchFocus} 
            onBlur={this.onSearchBlur} 
            onChange={this.onSearchChange}
          />
          <div className="header-search-icon-view fx fx-c" onClick={this.onSearchClick}>
            <img src={searchIcon} className="header-search-icon"/>
          </div>
        </div>
        <div className={dropdownClass}>
          <SearchSuggestions 
            searchText={searchText}
            suggestions={suggestions} 
            loading={searchAPILoading} 
            onSuggestionClick={this.onSuggestionSearchClick} 
            onClickOutside={this.onSuggestionClickOutside} 
          />
        </div>
      </div>
    );
  }

  render() {
    let searchBar = this.searchBar();
    let username = this.state.user.username ? this.state.user.username : '';
    let accountDropdownClass = this.state.showAccountMenu ? "header-account-dropdown" : "header-account-dropdown dropdown-hidden";
  	let totalCartProducts = this.state.totalCartProducts;
    return (
      <header className="app-header">
        <nav className="headerbar fx fx-vc fx-space-bw">
          <div className="app-header-logo" onClick={this.onLogoClick}>
            <img src={satyamLogo} className="header-logo"/>
          </div>
          <div className="header-search-flex-view">
            <div className="header-search-view fx fx-vc">
              { searchBar }
            </div>
          </div>
          <div className="fx fx-vc">
            <div className="header-account-view fx fx-vc" onClick={this.showAccountMenu}>
              <img src={accountIcon} className="header-account-icon"/>
              <div className="header-account-label">{username}</div>
              <img src={dropdownIcon} className="header-account-dropdown-icon"/>
              <div className={accountDropdownClass}>
                <HeaderAccountMenu 
                  onClickOutside={this.hideAccountMenu} 
                />
              </div>
            </div>
            <div className="header-separator-view"></div>
            <div className="header-cart-view fx fx-vc" onClick={this.onCartClick}>
              <img src={cartIcon} className="header-cart-icon"/>
              <div className="header-cart-badge-icon-view">
                <div className="header-cart-badge-icon-line-view"></div>
                <img src={cartBadgeIcon} className="header-cart-badge-icon"/>
                {
                  totalCartProducts > 0
                  ? (
                    <div className="header-cart-badge-label">{totalCartProducts}</div>
                    )
                  : null
                }
              </div>
              <div className="header-cart-label">CART</div>
            </div>
          </div>
        </nav>
      </header>
  	);
  }
}

function mapStateToProps(state) {
  const { gettingSuggestions, gettingSuggestionsFailed, suggestions } = state.search;
  const { user } = state.login;
  const { totalCartProducts } = state.cart;
  return {
    gettingSuggestions,
    gettingSuggestionsFailed,
    suggestions,
    user,
    totalCartProducts
  };
}

const connectedHeader = withRouter(connect(mapStateToProps)(Header));

export { connectedHeader as Header };