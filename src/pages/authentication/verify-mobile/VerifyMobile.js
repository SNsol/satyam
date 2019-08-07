import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import './VerifyMobile.css';

import { AuthHeader } from '../auth-header';
import { AuthFooter } from '../auth-footer';
import { authActions } from '../../../actions';

class VerifyMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: '',
      registering: false,
      showError: false,
      touched: {
        otp: false,
      }
    };

    this.onOtpChange = this.onOtpChange.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let registered = nextProps.registered ? true : false;
    if (registered) {
      this.props.history.push('/login');
      return;
    }
  
    let registering = nextProps.registering ? true: false;
    let registeringFailed = nextProps.registeringFailed ? true: false;

    let touched = Object.assign({}, this.state.touched);
    touched.otp = false;
    this.setState({
      registering: registering,
      showError: registeringFailed,
      touched: touched,
      otp: '',
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

  validate(otp) {
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

    const errors = this.validate(
      this.state.otp
    );

    if (errors['otp']) {
      return;
    }

    let tempToken = this.props.registerDetails.tempToken;

    if (!tempToken) {
      console.log("Temp token missing");
      return;
    }

    this.props.dispatch(authActions.verifyMobile(tempToken, this.state.otp));
  }


  render() {
    let registerDetails = this.props.registerDetails;
    var phone = registerDetails ? registerDetails.phone : '';
    let guide = "We've sent an OTP to the mobile number " + phone + ", please enter it below to complete verification."

    const errors = this.validate(
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
        <div className="verify-mobile-view fx fx-hc">
          <div className="verify-mobile-panel">
            <div className="verify-mobile-body">
              <div className="fx fx-hc">
                <label className="verify-mobile-header">VERIFYING MOBILE</label>
              </div>
              <div>
                <Alert 
                  show={this.state.showError} 
                  onClose={this.onErrorClose}
                  dismissible variant="danger">
                  <div>The OTP you entered is incorrect.</div>
                </Alert>                
              </div>
              <div className="verify-mobile-guide-view fx fx-col">
                <label className="verify-mobile-guide-label">{guide}</label>
              </div>
              <div className="verify-mobile-otp-view fx fx-col">
                <label for="otp" className="auth-label">Enter OTP</label>
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
              <div className="verify-mobile-signin-view fx fx-r-align">
                <button className="auth-button"  
                  disabled={this.state.registering}
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
  const { registerDetails, registering, registeringFailed, registered } = state.registration;
  return {
    registerDetails,
    registering,
    registeringFailed,
    registered
  };
}

const connectedVerifyMobile = withRouter(connect(mapStateToProps)(VerifyMobile));

export { connectedVerifyMobile as VerifyMobile };