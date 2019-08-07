import React, { Component } from 'react';
import Slider from "react-slick";
import './DashboardPromotions.css';

import promotionImage from '../../../../assets/images/promotion.png';

class DashboardPromotions extends Component {
  constructor(props) {
    super(props);
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
      <div className="dashboard-promotion-container">
          <Slider ref={c => (this.slider = c)} {...settings}>
            <div>
              <img src={promotionImage} className="dashboard-promotion-image"/>
            </div>
            <div>
              <img src={promotionImage} className="dashboard-promotion-image"/>
            </div>
            <div>
              <img src={promotionImage} className="dashboard-promotion-image"/>
            </div>
            <div>
              <img src={promotionImage} className="dashboard-promotion-image"/>
            </div>
          </Slider>
      </div>
  	);
  }
}

export { DashboardPromotions };