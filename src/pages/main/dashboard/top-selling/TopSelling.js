import React, { Component } from 'react';
import Slider from "react-slick";
import './TopSelling.css';

import { Product } from '../../product/product';

import arrowLeft from '../../../../assets/images/product-arrow-left.png';
import arrowRight from '../../../../assets/images/product-arrow-right.png';

class TopSelling extends Component {
  constructor(props) {
    super(props);

    let products = this.props.products ? this.props.products : [];
    this.state = {
      products: products
    };

    this.topSellingDom = this.topSellingDom.bind(this);
    this.onNavigateLeft = this.onNavigateLeft.bind(this);
    this.onNavigateRight = this.onNavigateRight.bind(this);
  }

  onNavigateLeft() {
    this.slider.slickPrev();
  }

  onNavigateRight() {
    this.slider.slickNext();
  }

  topSellingDom() {
    let settings = {
      dots: false,
      infinite: false,
      arrows: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    let productsDom = this.state.products.map(function(product) {
      return (
        <div className="top-selling-product-item-view" key={product.ProductCode}>
          <Product product={product} />
        </div>
      )
    });

    return (
      <Slider ref={c => (this.slider = c)} {...settings}>
        { productsDom }
      </Slider>
    );
  }

  render() {
    let topSellingDom = this.topSellingDom();

  	return (
      <div className="top-selling-container">
        <div className="top-selling-header fx fx-vc">
          <div className="top-selling-header-label">Top Savers Today</div>
        </div>
        <div className="top-selling-item-view">
          { topSellingDom }
        </div>
        <div className="product-navigate-view fx fx-c">
          <div className="fx fx-vc">
            <div className="product-navigate-button" onClick={this.onNavigateLeft}>
              <img src={arrowLeft} className="product-arrow-left-icon"/>
            </div>
            <div className="product-navigate-button" onClick={this.onNavigateRight}>
              <img src={arrowRight} className="product-arrow-right-icon"/>
            </div>
          </div>
        </div>
      </div>
  	);
  }
}

export { TopSelling };