import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import './VerifyOTP.css';

import { AuthHeader } from '../auth-header';
import { AuthFooter } from '../auth-footer';
import { authActions } from '../../../actions';

class VerifyOTP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: '',
      forgotPasswordInProgress: false,
      showOtpError: false,
      touched: {
        otp: false,
      }
    };

    this.onOtpChange = this.onOtpChange.bind(this);
    this.onOtpErrorClose = this.onOtpErrorClose.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let forgotPasswordOtpResetted = nextProps.forgotPasswordOtpResetted ? true : false;
    if (forgotPasswordOtpResetted) {
      this.props.history.push('/reset-password');
      return;
    }
  
    let forgotPasswordInProgress = nextProps.forgotPasswordInProgress ? true: false;
    let forgotPasswordFailed = nextProps.forgotPasswordFailed ? true: false;

    let touched = Object.assign({}, this.state.touched);
    touched.otp = false;
    this.setState({
      forgotPasswordInProgress: forgotPasswordInProgress,
      showOtpError: forgotPasswordFailed,
      touched: touched,
      otp: '',
    });
  }

  onBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  onOtpErrorClose() {
    this.setState({
      showOtpError: false
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

    let tempToken = this.props.forgotPasswordDetails.tempToken;

    if (!tempToken) {
      console.log("Temp token missing");
      return;
    }

    this.props.dispatch(authActions.validateResetOTP(tempToken, this.state.otp));
  }

  validateEmail(email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  render() {
    let guide = "For your security, we need to verify your identity.";

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
        <AuthHeader />
        <div className="verify-view fx fx-hc">
          <div className="verify-otp-panel">
            <div className="verify-otp-body">
              <div className="fx fx-hc">
                <label className="verify-otp-header">VERIFYING IT'S YOU</label>
              </div>
              <div>
                <Alert 
                  show={this.state.showOtpError} 
                  onClose={this.onOtpErrorClose}
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
                  disabled={this.state.forgotPasswordInProgress}
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
  const { forgotPasswordDetails, forgotPasswordInProgress, forgotPasswordFailed, forgotPasswordOtpResetted } = state.forgotPassword;
  return {
    forgotPasswordDetails,
    forgotPasswordInProgress,
    forgotPasswordFailed,
    forgotPasswordOtpResetted
  };
}

const connectedVerifyOTP = withRouter(connect(mapStateToProps)(VerifyOTP));

export { connectedVerifyOTP as VerifyOTP };