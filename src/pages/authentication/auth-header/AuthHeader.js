import React, { Component } from 'react';
import './AuthHeader.css';
import satyamLogo from '../../../assets/images/satyam-logo.png';

class AuthHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <header className="app-auth-header">
        <nav className="auth-headerbar fx fx-vc">
          <div>
            <img src={satyamLogo} className="auth-header-logo"/>
          </div>
        </nav>
      </header>
  	);
  }
}

export { AuthHeader };