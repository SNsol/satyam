import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from "react-slick";
import './ProductDetail.css';

import { Header } from '../../header';
import { Footer } from '../../footer';
import { productActions } from '../../../../actions';
import { cartActions } from '../../../../actions';
import offerPriceIcon from '../../../../assets/images/offer-price-icon.png';
import incrementIcon from '../../../../assets/images/increment.png';
import decrementIcon from '../../../../assets/images/decrement.png';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    let productId = props.match.params.id;
    let cartProductIds = this.props.cartProductIds ? this.props.cartProductIds : [];
    let cartProducts = this.props.cartProducts ? this.props.cartProducts : [];

    let cartProduct = cartProducts.find((element) => {
      return element.id === productId;
    })

    var selectedQuantity = 0;
    if (cartProduct) {
      selectedQuantity = cartProduct.quantity ? cartProduct.quantity : 0;
    }

    this.state = {
      productId: productId,
      gettingProductDetail: false,
      productDetail: {},
      addingCartProduct: false,
      addingCartProductFailed: false,
      updatingCartProduct: false,
      updatingCartProductFailed: false,
      removingCartProduct: false,
      removingCartProductFailed: false,
      cartProductIds: cartProductIds,
      cartProducts: cartProducts,
      selectedQuantity: selectedQuantity
    };

    this.loaderView = this.loaderView.bind(this);
    this.productDetailView = this.productDetailView.bind(this);
    this.productDetailsLeftView = this.productDetailsLeftView.bind(this);
    this.productDetailRightView = this.productDetailRightView.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.cartView = this.cartView.bind(this);
    this.onQuantityDecrement = this.onQuantityDecrement.bind(this);
    this.onQuantityIncrement = this.onQuantityIncrement.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let gettingProductDetail = nextProps.gettingProductDetail ? nextProps.gettingProductDetail : false;
    let productDetail = nextProps.productDetail ? nextProps.productDetail : {};
    let addingCartProduct = nextProps.addingCartProduct ? nextProps.addingCartProduct : false;
    let addingCartProductFailed = nextProps.addingCartProductFailed ? nextProps.addingCartProductFailed : false;
    let updatingCartProduct = nextProps.updatingCartProduct ? nextProps.updatingCartProduct : false;
    let updatingCartProductFailed = nextProps.updatingCartProductFailed ? nextProps.updatingCartProductFailed : false;
    let removingCartProduct = nextProps.removingCartProduct ? nextProps.removingCartProduct : false;
    let removingCartProductFailed = nextProps.removingCartProductFailed ? nextProps.removingCartProductFailed : false;
    let cartProductIds = nextProps.cartProductIds ? nextProps.cartProductIds : [];
    let cartProducts = nextProps.cartProducts ? nextProps.cartProducts : [];

    let product = productDetail ? productDetail : null;
    var selectedQuantity = 0;
    if (product) {
      let cartProduct = cartProducts.find((element) => {
        return element.id === product.ProductCode;
      });
      if (cartProduct) {
        selectedQuantity = cartProduct.quantity ? cartProduct.quantity : 0;
      }
    }
    
    this.setState({
      gettingProductDetail: gettingProductDetail,
      productDetail: productDetail,
      addingCartProduct: addingCartProduct,
      addingCartProductFailed: addingCartProductFailed,
      updatingCartProduct: updatingCartProduct,
      updatingCartProductFailed: updatingCartProductFailed,
      removingCartProduct: removingCartProduct,
      removingCartProductFailed: removingCartProductFailed,
      cartProductIds: cartProductIds,
      cartProducts: cartProducts,
      selectedQuantity: selectedQuantity
    });
  }

  componentDidMount() {
    let productId = this.state.productId;
    this.props.dispatch(productActions.productDetail(productId));
  }

  onAddToCart() {
    let product = this.state.productDetail;
    this.props.dispatch(cartActions.addCart(product));
  }

  onQuantityDecrement() {
    let disallowDecrement = (this.state.addingCartProduct) || (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    if (disallowDecrement) {
      return;
    }
    let selectedQuantity = this.state.selectedQuantity - 1;

    if (selectedQuantity <= 0) {
      let product = this.state.productDetail;
      this.props.dispatch(cartActions.removeCart(product.ProductCode));
      return;
    }

    this.setState({
      selectedQuantity: selectedQuantity
    });

    let product = this.state.productDetail;
    this.props.dispatch(cartActions.updateCart(product, selectedQuantity));
  }

  onQuantityIncrement() {
    let disallowDecrement = (this.state.addingCartProduct) || (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    if (disallowDecrement) {
      return;
    }

    let selectedQuantity = this.state.selectedQuantity + 1;

    this.setState({
      selectedQuantity: selectedQuantity
    });

    let product = this.state.productDetail;
    this.props.dispatch(cartActions.updateCart(product, selectedQuantity));
  }

  cartView() {
    let product = this.state.productDetail;
    let cartProduct = this.state.cartProducts.find((element) => {
      return element.id === product.ProductCode;
    })

    var addedToCart = false;
    if (cartProduct) {
      addedToCart = true;
    }

    let cartChangeInProgress = (this.state.addingCartProduct) || (this.state.updatingCartProduct) || (this.state.removingCartProduct);
    let selectedQuantity = this.state.selectedQuantity;

    if (addedToCart) {
      return (
        <div className="product-detail-cart-added-view fx fx-c">
          <div className="product-detail-cart-decrement-icon-view" disabled={cartChangeInProgress} onClick={this.onQuantityDecrement}>
            <img src={decrementIcon} className="product-detail-cart-decrement-icon"/>
          </div>
          <div className="product-detail-cart-quantity-label">
            {selectedQuantity}
          </div>
          <div className="product-detail-cart-increment-icon-view" disabled={cartChangeInProgress} onClick={this.onQuantityIncrement}>
            <img src={incrementIcon} className="product-detail-cart-increment-icon"/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="product-detail-cart-add-view">
            <button className="product-detail-cart-add-button" disabled={cartChangeInProgress} onClick={this.onAddToCart}>Add to Cart</button>
        </div>
      );
    }
  }

  loaderView() {
    return (
      <div className="product-detail-loader-view fx fx-c">
        <Loader 
          type="ThreeDots"
          color="#FF4D4D"
          height="80" 
          width="80"
        />
      </div>
    );
  }

  productDetailsLeftView() {
    let settings = {
      dots: true,
      infinite: false,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let productDetail = this.state.productDetail;
    var productImages = [];
    if (productDetail.ProductImages && productDetail.ProductImages.length > 0) {
      productImages = productDetail.ProductImages;
    } else if (productDetail.Thumb) {
      productImages.push(productDetail.Thumb);
    }

    let previewImagesDom = productImages.map(function(previewImage) {
      return (
        <div>
          <div className="product-detail-preview-image-container fx fx-c">
            <img src={previewImage} className="product-detail-preview-image"/>
          </div>
        </div>
      )
    });

    var productDescription = "No description";
    if (productDetail.ProductDescription) {
      productDescription = productDetail.ProductDescription;
    }

    return (
      <div className="product-detail-left-container">
        <div className="product-detail-preview-view">
          <Slider {...settings}>
            { previewImagesDom }
          </Slider>
        </div>
        <div className="product-description-view">
          <div className="product-description-header-label">
            Product Details
          </div>
           <div className="product-description-detail-label">
            { productDescription }
          </div>
        </div>
      </div>
    );
  }

  productDetailRightView() {
    let productDetail = this.state.productDetail;
    let productName = productDetail.ProductName ? productDetail.ProductName : '';
    let productPrice = productDetail.Sales_rate ? productDetail.Sales_rate : 0;
    let productOriginalPrice = productDetail.BuyPrice ? productDetail.BuyPrice : 0;
    let discount = productDetail.discount ? productDetail.discount : 0;
    let offerPercent = parseInt(discount * 100);
    let unit = productDetail.UOM ? productDetail.UOM : '';

    let cartView = this.cartView();

    let addingToCart = this.state.addingCartProduct ? this.state.addingCartProduct : false;
    return (
      <div className="product-detail-right-container">
        <div className="product-detail-header fx fx-vc">
          <div className="product-detail-header-label">{productName}</div>
        </div>
        <div className="product-detail-price-view fx fx-vc fx-space-bw">
          <div className="product-detail-offer-price-view fx fx-vc">
            <img src={offerPriceIcon} className="product-detail-offer-price-image"/>
            <div className="product-detail-offer-price-label">
              Rs. {productPrice} Offer Price
            </div>
          </div>
          <div className="product-detail-original-price-view fx fx-vc">
            <div className="product-detail-original-price-label">
              <strike>Rs. { productOriginalPrice }</strike>
            </div>
          </div>
        </div>
        <div className="product-detail-offer-percentage-view">
          <div className="product-detail-offer-percentage-label">
            { offerPercent }% Offer on this product
          </div>
        </div>
        <div className="product-detail-addcart-view">
          { cartView }
        </div>
        <div className="product-detail-separator-view">
        </div>
        <div className="product-detail-unit-view">
          <div className="product-detail-unit-header-label">
            UNIT
          </div>
          <div className="product-detail-unit-button">
            { unit }
          </div>
        </div>
      </div>
    );
  }

  productDetailView() {
    let productDetailsLeftView = this.productDetailsLeftView();
    let productDetailRightView = this.productDetailRightView();
    return (
      <div className="product-detail-container mx-auto">
        <div className="product-detail-main-view fx">
          <div className="product-detail-left-view">
            { productDetailsLeftView }
          </div>
          <div className="product-detail-right-view">
            { productDetailRightView }
          </div>
        </div>
      </div>
    );
  }

  render() {
    let loaderView = this.loaderView();
    let productDetailView = this.productDetailView();
    let mainView = this.state.gettingProductDetail ? loaderView : productDetailView;

  	return (
      <div className="product-detail-view">
        <Header />
        <div className="product-detail-container-view">
          { mainView }
        </div>
        <Footer />
      </div>
  	);
  }
}

function mapStateToProps(state) {
  const { gettingProductDetail, gettingProductDetailFailed, productDetail } = state.productDetail;
  const { 
    addingCartProduct, addingCartProductFailed, addedToCart,
    updatingCartProduct, updatingCartProductFailed, updatedCartProduct,
    removingCartProduct, removingCartProductFailed, removedCartProduct,
    cartProductIds, cartProducts 
  } = state.cart;
  return {
    gettingProductDetail, gettingProductDetailFailed, productDetail,
    addingCartProduct, addingCartProductFailed, addedToCart, 
    updatingCartProduct, updatingCartProductFailed, updatedCartProduct,
    removingCartProduct, removingCartProductFailed, removedCartProduct,
    cartProductIds, cartProducts
  };
}

const connectedProductDetail = withRouter(connect(mapStateToProps)(ProductDetail));

export { connectedProductDetail as ProductDetail };