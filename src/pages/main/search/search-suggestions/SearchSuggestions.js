import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import './SearchSuggestions.css';

class SearchSuggestions extends Component {
  constructor(props) {
    super(props);

    let loading = this.props.loading ? this.props.loading : false;
    let products = this.props.suggestions ? this.props.suggestions : [];
    let searchText = this.props.searchText ? this.props.searchText : '';

    this.state = {
      loading: loading,
      products: products,
      searchText: searchText
    };

    this.loaderView = this.loaderView.bind(this);
    this.productsView = this.productsView.bind(this);
    this.onSuggestionClick = this.onSuggestionClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let loading = nextProps.loading ? nextProps.loading : false;
    let products = nextProps.suggestions ? nextProps.suggestions : [];
    let searchText = nextProps.searchText ? nextProps.searchText : '';
    this.setState({
      loading: loading,
      products: products,
      searchText: searchText
    });
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.onClickOutside();
  }

  onSuggestionClick(product) {
    this.props.onSuggestionClick(product);
  }

  onClickOutside() {
    this.props.onClickOutside();
  }

  loaderView() {
    var self = this;
    return (
      <div className="search-suggestion-loader-view fx fx-c">
        <Loader 
           type="ThreeDots"
           color="#FF4D4D"
           height="50" 
           width="50"
        />
      </div>
    );
  }

  productsView() {
    let products = this.state.products;
    let searchText = this.state.searchText;
    if (products.length <= 0 && searchText.length > 0) {
      return (
        <div className="search-suggestion-no-result-view fx fx-vc">
          <div className="search-suggestion-no-result-label">
            No results found..
          </div>
        </div>
      );
    }
    var self = this;
    return this.state.products.map(function(product) {
      return (
        <div className="search-suggestion-item-view fx" key={product.ProductCode} onClick={() => self.onSuggestionClick(product)}>
          <div className="search-suggestion-item-image-view">
            <img src={product.Thumb} className="search-suggestion-item-image"/>
          </div>
          <div className="search-suggestion-item-detail-view">
            <div className="search-suggestion-item-detail-label">
              { product.ProductName }
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    let loaderView = this.loaderView();
    let productsView = this.productsView();
    let searchSuggestionView = this.state.loading ? loaderView : productsView;

  	return (
      <div className="search-suggestion-container" ref={node => { this.node = node; }}>
        { searchSuggestionView }
      </div>
  	);
  }
}

export { SearchSuggestions };