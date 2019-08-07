import React, { Component } from 'react';
import { connect } from "react-redux";
import './Footer.css';

import facebookIcon from '../../../assets/images/facebook.png';
import twitterIcon from '../../../assets/images/twitter.png';
import instagramIcon from '../../../assets/images/instagram.png';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <footer>
        <nav className="footerbar fx fx-c">
          <div className="fx fx-c h-100 w-100">
            <div className="footer-copyright-label">Ⓒ Satyam Supermarket Pvt. Ltd., 2019</div>
          </div>
          <div className="social-view h-100">
            <div className="follow-view">
              <div className="follow-us-label sa-mt-10">
                Follow Us
              </div>
              <div className="social-icon-view fx sa-mt-5">
                <img src={facebookIcon} className="social-icon"/>
                <img src={twitterIcon} className="social-icon sa-ml-15"/>
                <img src={instagramIcon} className="social-icon sa-ml-15"/>
              </div>
            </div>
            <div className="sharing-view">
              <div className="share-us-label">
                Share Us
              </div>
              <div className="social-icon-view fx sa-mt-5">
                <img src={facebookIcon} className="social-icon"/>
                <img src={twitterIcon} className="social-icon sa-ml-15"/>
                <img src={instagramIcon} className="social-icon sa-ml-15"/>
              </div>
            </div>
          </div>
        </nav>
      </footer>
  	);
  }
}

export { Footer };