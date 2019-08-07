import React, { Component } from 'react';
import { connect } from "react-redux";
import './AuthFooter.css';

class AuthFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <footer>
        <nav className="auth-footerbar fx fx-c">
          <div>
            <div className="auth-footer-copyright-label">Ⓒ Satyam Supermarket Pvt. Ltd., 2019</div>
          </div>
        </nav>
      </footer>
  	);
  }
}

export { AuthFooter };