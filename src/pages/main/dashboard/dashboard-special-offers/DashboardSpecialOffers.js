import React, { Component } from 'react';
import './DashboardSpecialOffers.css';

import arrowLeftIcon from '../../../../assets/images/arrow-left-icon.png';
import arrowRightIcon from '../../../../assets/images/arrow-right-icon.png';
import offerImage from '../../../../assets/images/club-image.png';

class DashboardSpecialOffers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <div className="dashboard-special-offers-container">
        <div className="dashboard-special-offers-header fx fx-vc">
          <div className="dashboard-special-offers-header-label">SPECIAL OFFERS</div>
        </div>
        <div className="dashboard-special-offers-item-view">
          <div className="dashboard-special-offers-item-container fx">
            <div className="dashboard-special-offers-item-image-view fx fx-hc">
              <img src={offerImage} className="dashboard-special-offers-image"/>
            </div>
            <div className="dashboard-special-offers-item-detail-view">
              <div className="dashboard-special-offers-item-label">
                Haldram Kaju Barfi and Haldram Besar laddu
              </div>
              <div className="dashboard-special-offers-item-price-label">
                Rs. 350.00
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-special-offers-item-view">
          <div className="dashboard-special-offers-item-container fx">
            <div className="dashboard-special-offers-item-image-view fx fx-hc">
              <img src={offerImage} className="dashboard-special-offers-image"/>
            </div>
            <div className="dashboard-special-offers-item-detail-view">
              <div className="dashboard-special-offers-item-label">
                Haldram Kaju Barfi and Haldram Besar laddu
              </div>
              <div className="dashboard-special-offers-item-price-label">
                Rs. 350.00
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-special-offers-item-view">
          <div className="dashboard-special-offers-item-container fx">
            <div className="dashboard-special-offers-item-image-view fx fx-hc">
              <img src={offerImage} className="dashboard-special-offers-image"/>
            </div>
            <div className="dashboard-special-offers-item-detail-view">
              <div className="dashboard-special-offers-item-label">
                Haldram Kaju Barfi and Haldram Besar laddu
              </div>
              <div className="dashboard-special-offers-item-price-label">
                Rs. 350.00
              </div>
            </div>
          </div>
        </div>
      </div>
  	);
  }
}

export { DashboardSpecialOffers };