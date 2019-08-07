import React, { Component } from 'react';
import Slider from "react-slick";
import './DashboardClub.css';

import arrowLeftIcon from '../../../../assets/images/arrow-left-icon.png';
import arrowRightIcon from '../../../../assets/images/arrow-right-icon.png';
import clubImage from '../../../../assets/images/club-image.png';

class DashboardClub extends Component {
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
     <div className="dashboard-club-container">
        <div className="dashboard-club-header fx fx-vc fx-space-bw">
          <div className="dashboard-club-header-label">SMART BACHAT CLUB</div>
          <div className="dashboard-club-navigate-menu fx fx-vc">
            <div className="dashboard-club-navigate-button" onClick={this.onNavigateLeft}>
              <img src={arrowLeftIcon} className="dashboard-club-arrow-left-icon"/>
            </div>
            <div className="dashboard-club-navigate-button" onClick={this.onNavigateRight}>
              <img src={arrowRightIcon} className="dashboard-club-arrow-right-icon"/>
            </div>
          </div>
        </div>
        <div className="dashboard-club-item-view">
          <Slider ref={c => (this.slider = c)} {...settings}>
            <div>
              <div className="dashboard-club-item-image-container fx fx-c">
                <img src={clubImage} className="dashboard-club-image"/>
              </div>
              <div className="dashboard-club-detail-view">
                <div className="dashboard-club-item-label">
                  Haldram Kaju Barfi and Haldram Besar laddu
                </div>
                <div className="dashboard-club-item-price-label">
                  Rs. 350.00
                </div>
              </div>
            </div>
            <div>
              <div className="dashboard-club-item-image-container fx fx-c">
                <img src={clubImage} className="dashboard-club-image"/>
              </div>
              <div className="dashboard-club-detail-view">
                <div className="dashboard-club-item-label">
                  Haldram Kaju Barfi and Haldram Besar laddu
                </div>
                <div className="dashboard-club-item-price-label">
                  Rs. 350.00
                </div>
              </div>
            </div>
            <div>
              <div className="dashboard-club-item-image-container fx fx-c">
                <img src={clubImage} className="dashboard-club-image"/>
              </div>
              <div className="dashboard-club-detail-view">
                <div className="dashboard-club-item-label">
                  Haldram Kaju Barfi and Haldram Besar laddu
                </div>
                <div className="dashboard-club-item-price-label">
                  Rs. 350.00
                </div>
              </div>
            </div>
            <div>
              <div className="dashboard-club-item-image-container fx fx-c">
                <img src={clubImage} className="dashboard-club-image"/>
              </div>
              <div className="dashboard-club-detail-view">
                <div className="dashboard-club-item-label">
                  Haldram Kaju Barfi and Haldram Besar laddu
                </div>
                <div className="dashboard-club-item-price-label">
                  Rs. 350.00
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

export { DashboardClub };