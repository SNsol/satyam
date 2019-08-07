import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import './VerifyLoginOTP.css';

import { AuthHeader } from '../auth-header';
import { AuthFooter } from '../auth-footer';
import { authActions } from '../../../actions';

class VerifyLoginOTP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: '',
      showLoginError: false,
      loggingIn: false,
      touched: {
        otp: false,
      }
    };

    this.onOtpChange = this.onOtpChange.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let loggedIn = nextProps.loggedIn ? true : false;
    if (loggedIn) {
      this.props.history.push('/');
      return;
    }
  
    let loggingIn = nextProps.loggingIn ? true: false;
    let loggingInFailed = nextProps.loggingInFailed ? true: false;

    let touched = Object.assign({}, this.state.touched);
    touched.otp = false;
    this.setState({
      loggingIn: loggingIn,
      showLoginError: loggingInFailed,
      touched: touched,
      touched: ''
    });
  }

  onBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  onErrorClose() {
    this.setState({
      showError: false
    });
  }

  validateOtp(otp) {
    return {
      otp: otp.length === 0
    };
  }

  onOtpChange(e) {
    this.setState({
      otp: e.currentTarget.value
    });
  }

  onContinue() {
    let touched = Object.assign({}, this.state.touched);
    touched.otp = true;
    this.setState({touched});

    const errors = this.validateOtp(
      this.state.otp
    );

    if (errors['otp']) {
      return;
    }

    let username = this.props.otpDetails.username;
    let tempToken = this.props.otpDetails.tempToken;

    if (!(username && tempToken)) {
      console.log("Temp token missing");
      return;
    }

    this.props.dispatch(authActions.validateLoginOTP(tempToken, username, this.state.otp));
  }

  validateEmail(email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

 render() {
    let otpDetails = this.props.otpDetails;
    var emailOrPhone = otpDetails ? otpDetails.username : '';
    emailOrPhone = emailOrPhone ? emailOrPhone : null;
    let type = this.validateEmail(emailOrPhone) ? "email" : "phone";
    let guide = "We've sent an OTP to the " + type + " " + emailOrPhone + ", please enter it below to complete verification."

    const errors = this.validateOtp(
      this.state.otp
    );

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <AuthHeader/>
        <div className="verify-view fx fx-hc">
          <div className="verify-otp-panel">
            <div className="verify-otp-body">
              <div className="fx fx-hc">
                <label className="verify-otp-header">LOGIN WITH OTP</label>
              </div>
              <div>
                <Alert 
                  show={this.state.showLoginError} 
                  onClose={this.onErrorClose}
                  dismissible variant="danger">
                  <div>The OTP you entered is incorrect.</div>
                </Alert>                
              </div>
              <div className="verify-otp-guide-view fx fx-col">
                <label className="verify-otp-guide-label">{guide}</label>
              </div>
              <div className="otp-view fx fx-col">
                <label className="auth-label">Enter OTP</label>
                <input type="text" 
                  className={shouldMarkError('otp') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('otp')}
                  value={this.state.otp}
                  onChange={this.onOtpChange}
                  id="otp" />
                { shouldMarkError('otp') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
              <div className="otp-signin-view fx fx-r-align">
                <button className="auth-button"  
                  disabled={this.state.loggingIn}
                  onClick={this.onContinue}>Continue</button>
              </div>
            </div>
          </div>
        </div>
        <AuthFooter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { otpDetails, loggingIn, loggingInFailed, loggedIn } = state.login;
  return {
    otpDetails,
    loggingIn,
    loggingInFailed,
    loggedIn
  };
}

const connectedVerifyLoginOTP = withRouter(connect(mapStateToProps)(VerifyLoginOTP));

export { connectedVerifyLoginOTP as VerifyLoginOTP };