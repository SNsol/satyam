import React, { Component } from 'react';
import Slider from "react-slick";
import './DashboardHotDeals.css';

import arrowLeftIcon from '../../../../assets/images/arrow-left-icon.png';
import arrowRightIcon from '../../../../assets/images/arrow-right-icon.png';
import hotDealImage from '../../../../assets/images/hot-deal.png';

class DashboardHotDeals extends Component {
  constructor(props) {
    super(props);

    this.onNavigateLeft = this.onNavigateLeft.bind(this);
    this.onNavigateRight = this.onNavigateRight.bind(this);
  }

  onNavigateLeft() {
    this.slider.slickPrev();
  }

  onNavigateRight() {
    this.slider.slickNext();
  }

  render() {
    let settings = {
      dots: false,
      infinite: false,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  	return (
     <div className="dashboard-hot-deals-container">
        <div className="dashboard-hot-deals-header fx fx-vc fx-space-bw">
          <div className="dashboard-hot-deals-header-label">HOT DEALS</div>
          <div className="dashboard-hot-deals-navigate-menu fx fx-vc">
            <div className="dashboard-hot-deals-navigate-button" onClick={this.onNavigateLeft}>
              <img src={arrowLeftIcon} className="dashboard-hot-deals-arrow-left-icon"/>
            </div>
            <div className="dashboard-hot-deals-navigate-button" onClick={this.onNavigateRight}>
              <img src={arrowRightIcon} className="dashboard-hot-deals-arrow-right-icon"/>
            </div>
          </div>
        </div>
        <div className="dashboard-hot-deals-item-view">
          <Slider ref={c => (this.slider = c)} {...settings}>
            <div>
              <img src={hotDealImage} className="dashboard-hot-deals-image"/>
            </div>
            <div>
              <img src={hotDealImage} className="dashboard-hot-deals-image"/>
            </div>
            <div>
              <img src={hotDealImage} className="dashboard-hot-deals-image"/>
            </div>
            <div>
              <img src={hotDealImage} className="dashboard-hot-deals-image"/>
            </div>
          </Slider>
        </div>
        <div className="dashboard-hot-deals-details-view fx">
          <div className="dashboard-hot-deals-details-container">
            <div className="dashboard-hot-deals-detail-label">
              Tooby Washing Powder
            </div>
            <div className="dashboard-hot-deals-price-view fx">
              <div className="dashboard-hot-deals-price-label">
                Rs. 300.00
              </div>
              <div className="dashboard-hot-deals-discount-price-label">
                <strike>Rs. 600.00</strike>
              </div>
            </div>
          </div>
          <div className="dashboard-hot-deals-cart-view">
            <button className="dashboard-hot-detals-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
  	);
  }
}

export { DashboardHotDeals };