import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './SearchResults.css';

import { Header } from '../../header';
import { Footer } from '../../footer';
import { Product } from '../../product/product';
import { searchActions } from '../../../../actions';
import { treeArrowIcon } from '../../../../assets/images/tree-arrow.png';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    let searchKey = props.match.params.key;
    this.state = {
      searchKey: searchKey,
      gettingSearchedProducts: false,
      searchedProducts: []
    };

    this.loaderView = this.loaderView.bind(this);
    this.headerView = this.headerView.bind(this);
    this.productsView = this.productsView.bind(this);
    this.noProductsView = this.noProductsView.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let gettingSearchedProducts = nextProps.gettingSearchedProducts ? nextProps.gettingSearchedProducts : false;
    let searchedProducts = nextProps.searchedProducts ? nextProps.searchedProducts : [];
    this.setState({
      gettingSearchedProducts: gettingSearchedProducts,
      searchedProducts: searchedProducts
    });

    if (nextProps.location.pathname !== this.props.location.pathname) {
      let searchKey = nextProps.match.params.key;
      this.setState({
        searchKey: searchKey
      });
      let key = searchKey ? searchKey : "";
      this.props.dispatch(searchActions.searchProducts(key));
    }
  }

  componentDidMount() {
    let key = this.state.searchKey ? this.state.searchKey : "";
    this.props.dispatch(searchActions.searchProducts(key));
  }

  loaderView() {
    return (
      <div className="search-results-loader-view fx fx-c">
        <Loader 
           type="ThreeDots"
           color="#FF4D4D"
           height="80" 
           width="80"
        />
      </div>
    );
  }

  noProductsView() {
    return (
     <div className="search-results-products-item-view mx-auto">
        <div className="search-results-no-products-view">
          <div className="search-results-no-products-label">
            No Product Found..
          </div>
        </div>
      </div>
    );
  }

  headerView() {
    let headerText = "Showing " + this.state.searchKey + " Results";
    return (
      <div className="search-results-products-header-view">
        <div className="search-results-products-header-top-view fx fx-vc">
          <Link to="/" className="search-result-home-link">Home</Link>
          <div className="search-result-tree-arrow">></div>
          <div className="search-result-tree-label">Result</div>
        </div>
        <div className="search-results-products-header-label-view fx fx-vc">
          <div className="search-result-header-label">{headerText}</div>
        </div>
      </div>
    );
  }

  productsView() {
    let headerView = this.headerView();
    let products = this.state.searchedProducts;

    if (products.length <= 0) {
      let noProductsView = this.noProductsView();
      return (
        <div className="search-results-products-view">
          { headerView }
          { noProductsView }
        </div>
      );
    }

    let productsDom = products.map(function(product) {
      return (
        <div className="search-results-products-item" key={product.ProductCode}>
          <Product product={product}/>
        </div>
      )
    });


    return (
      <div className="search-results-products-view">
        { headerView }

        <div className="search-results-products-item-view mx-auto">
          <div className="search-results-products-item-container fx fx-wrap">
            { productsDom }
          </div>
        </div>
      </div>
    );
  }

  render() {
    let loaderView = this.loaderView();
    let productsView = this.productsView();
    let searchResultsView = this.state.gettingSearchedProducts ? loaderView : productsView;

  	return (
      <div className="search-results-view">
        <Header />
        <div className="search-results-container">
          { searchResultsView }
        </div>
        <Footer />
      </div>
  	);
  }
}

function mapStateToProps(state) {
  const { gettingSearchedProducts, gettingSearchedProductsFailed, searchedProducts } = state.search;
  return {
    gettingSearchedProducts,
    gettingSearchedProductsFailed,
    searchedProducts
  };
}

const connectedSearchResults = withRouter(connect(mapStateToProps)(SearchResults));

export { connectedSearchResults as SearchResults };