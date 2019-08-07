import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './ViewProducts.css';

import { Header } from '../../header';
import { Footer } from '../../footer';
import { Product } from '../../product/product';
import { productActions } from '../../../../actions';
import categoryIcon from '../../../../assets/images/category.png';

class ViewProducts extends Component {
  constructor(props) {
    super(props);

    let categoryName = props.match.params.name.replace('%2F', '/');
    let categoryId = props.match.params.id;
    this.state = {
      categoryName: categoryName,
      categoryId: categoryId,
      selectedCategoryId: categoryId,
      selectedCategoryName: categoryName,
      isCategory: true,
      gettingSubcategories: false,
      subcategories: [],
      gettingProducts: false,
      products: []
    };

    this.subcategoryLoaderView = this.subcategoryLoaderView.bind(this);
    this.productsLoaderView = this.productsLoaderView.bind(this);
    this.subcategoryListView = this.subcategoryListView.bind(this);
    this.mainView = this.mainView.bind(this);
    this.productsView = this.productsView.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.onSubcategoryClick = this.onSubcategoryClick.bind(this);
    this.subcategoriesDom = this.subcategoriesDom.bind(this);
    this.productsListView = this.productsListView.bind(this);
    this.productsHeaderView = this.productsHeaderView.bind(this);
    this.searchForProducts = this.searchForProducts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let gettingSubcategories = nextProps.gettingSubcategories ? nextProps.gettingSubcategories : false;
    let subcategories = nextProps.subcategories ? nextProps.subcategories : [];
    let gettingProducts = nextProps.gettingProducts ? nextProps.gettingProducts : false;
    let products = nextProps.products ? nextProps.products : [];
    this.setState({
      gettingSubcategories: gettingSubcategories,
      subcategories: subcategories,
      gettingProducts: gettingProducts,
      products: products
    });
  }

  componentDidMount() {
    let categoryId = this.state.categoryId;
    this.props.dispatch(productActions.subcategories(categoryId));
    this.searchForProducts();
  }

  searchForProducts() {
    let categoryId = this.state.selectedCategoryId;
    if (!categoryId) {
      return;
    }

    let isCategory = this.state.isCategory ? this.state.isCategory : false;
    if (isCategory) {
      this.props.dispatch(productActions.productsForCategory(categoryId));
    } else {
      this.props.dispatch(productActions.productsForSubcategory(categoryId));
    }
  }

  onCategoryClick() {
    let categoryId = this.state.categoryId;
    let categoryName = this.state.categoryName;
    this.setState({
      selectedCategoryId: categoryId,
      selectedCategoryName: categoryName,
      isCategory: true
    });
    this.searchForProducts();
  }

  onSubcategoryClick(subcategory) {
    let categoryId = subcategory.categoryId;
    let categoryName = subcategory.categoryName;
    this.setState({
      selectedCategoryId: categoryId,
      selectedCategoryName: categoryName,
      isCategory: false
    });
    this.searchForProducts();
  }

  subcategoryLoaderView() {
    return (
      <div className="view-products-subcategory-loader-view fx fx-c">
        <Loader 
          type="ThreeDots"
          color="#FF4D4D"
          height="80" 
          width="80"
        />
      </div>
    );
  }

  subcategoriesDom(subcategories) {
    var self = this;
    return subcategories.map(function(subcategory) {
      return (
        <div className="view-products-subcategory-item fx fx-vc" onClick={() => self.onSubcategoryClick(subcategory)}>
          <div className="view-products-subcategory-item-label">
            {subcategory.categoryName}
          </div>
        </div>
      )
    });
  }

  subcategoryListView() {
    let categoryName = this.state.categoryName ? this.state.categoryName : "";
    let subcategories = this.state.subcategories ? this.state.subcategories : [];
    let subcategoriesDom = this.subcategoriesDom(subcategories);
    return (
      <div className="view-products-subcategory-list-view">
        <div className="view-products-subcategory-header-view fx fx-vc" onClick={this.onCategoryClick}>
          <img src={categoryIcon} className="view-products-subcategory-header-icon"/>
          <div className="view-products-subcategory-header-label">{categoryName}</div>
        </div>
        <div className="view-products-subcategory-item-view">
          { subcategoriesDom }
        </div>
      </div>
    );
  }

  mainView() {
    let subcategoryListView = this.subcategoryListView();
    let productsView = this.productsView();
    return (
      <div className="view-products-container mx-auto">
        <div className="view-products-container-main-view fx">
          <div className="view-products-subcategory-menu-view">
            { subcategoryListView }
          </div>
          <div className="view-products-products-view">
            { productsView }
          </div>
        </div>
      </div>
    );
  }

  noProductsView() {
    return (
      <div className="view-products-no-products-view">
        <div className="view-products-no-products-label">
          No Product Found..
        </div>
      </div>
    );
  }

  productsLoaderView() {
    return (
      <div className="view-products-products-loader-view fx fx-c">
        <Loader 
           type="ThreeDots"
           color="#FF4D4D"
           height="80" 
           width="80"
        />
      </div>
    );
  }

  productsView() {
    let productsLoaderView = this.productsLoaderView();
    let productsListView = this.productsListView();
    return (
      <div className="view-products-products-container">
        { productsListView }
      </div>
    );
  }

  productsListView() {
    let noProductsView = this.noProductsView();
    let productsHeaderView = this.productsHeaderView();
    let products = this.state.products;

    if (products.length <= 0) {
      return (
        <div className="view-products-products-list-view">
          { productsHeaderView }
          { noProductsView }
        </div>
      );
    }

    let productsDom = products.map(function(product) {
      return (
        <div className="view-products-products-item">
          <Product product={product}/>
        </div>
      )
    });

    return (
      <div className="view-products-products-list-view">
        { productsHeaderView }
        <div className="view-products-products-item-container fx fx-wrap">
          { productsDom }
        </div>
      </div>
    );
  }

  productsHeaderView() {
    let selectedCategoryName = this.state.selectedCategoryName ? this.state.selectedCategoryName : '';
    let headerText = "Showing " + selectedCategoryName + " Results";
    let categoryName = this.state.categoryName;
    let isCategory = this.state.isCategory ? this.state.isCategory : false;
    return (
      <div className="view-products-header-view">
        {
          isCategory 
          ? (
            <div className="view-products-header-top-view fx fx-vc">
              <Link to="/" className="view-products-home-link">Home</Link>
              <div className="view-products-tree-arrow">></div>
              <div className="view-products-tree-label">{categoryName}</div>
            </div>
          )
          : (
            <div className="view-products-header-top-view fx fx-vc">
              <Link to="/" className="view-products-home-link">Home</Link>
              <div className="view-products-tree-arrow">></div>
              <div className="view-products-home-link-div" onClick={this.onCategoryClick}>{categoryName}</div>
              <div className="view-products-tree-arrow">></div>
              <div className="view-products-tree-label">{selectedCategoryName}</div>
            </div>
          )
        }
        <div className="view-products-header-label-view fx fx-vc">
          <div className="view-products-header-label">{headerText}</div>
        </div>
      </div>
    );
  }

  render() {
    let subcategoryLoaderView = this.subcategoryLoaderView();
    let mainView = this.mainView();
    let gettingSubcategories = this.state.gettingSubcategories ? this.state.gettingSubcategories : false;
    let viewProductsView = gettingSubcategories ? subcategoryLoaderView : mainView;
    return (
      <div className="view-products-view">
        <Header />
        <div className="view-products-container-view">
          { viewProductsView }
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { gettingSubcategories, gettingSubcategoriesFailed, subcategories } = state.category;
  const { gettingProducts, gettingProductsFailed, products } = state.product;
  return {
    gettingSubcategories,
    gettingSubcategoriesFailed,
    subcategories,
    gettingProducts,
    gettingProductsFailed,
    products
  };
}

const connectedViewProducts = withRouter(connect(mapStateToProps)(ViewProducts));

export { connectedViewProducts as ViewProducts };