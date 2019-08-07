import React, { Component } from 'react';
import './DashboardWelcome.css';

import welcomeBanner from '../../../../assets/images/welcome-banner.png';

class DashboardWelcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <div className="dashboard-welcome-container">
        <img src={welcomeBanner} className="dashboard-welcome-image"/>
      </div>
  	);
  }
}

export { DashboardWelcome };