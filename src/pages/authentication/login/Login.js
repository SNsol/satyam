import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom'
import './Login.css';

import { AuthHeader } from '../auth-header';
import { AuthFooter } from '../auth-footer';
import { authActions } from '../../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

     this.state = {
      email: '',
      password: '',
      otpEmail: '',
      otpMode: false,
      showLoginError: false,
      showLoginOtpError: false,
      loggingIn: false,
      loggingOtpIn: false,
      touched: {
        email: false,
        password: false,
        otpEmail: false,
      }
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onOtpEmailChange = this.onOtpEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginErrorClose = this.onLoginErrorClose.bind(this);
    this.onOtpLoginErrorClose = this.onOtpLoginErrorClose.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let loggedIn = nextProps.loggedIn ? true : false;
    if (loggedIn) {
      this.props.history.push('/');
      return;
    }
    let loggedOtpIn = nextProps.loggedOtpIn ? true : false;
    if (loggedOtpIn) {
      this.props.history.push('/verify-login-otp');
      return;
    }
    let loggingIn = nextProps.loggingIn ? true: false;
    let loggingInFailed = nextProps.loggingInFailed ? true: false;

    let loggingOtpIn = nextProps.loggingOtpIn ? true: false;
    let loggingOtpInFailed = nextProps.loggingOtpInFailed ? true: false;

    let touched = Object.assign({}, this.state.touched);
    touched.email = false;
    touched.password = false; 
    touched.otpEmail = false; 
    this.setState({
      loggingIn: loggingIn,
      showLoginError: loggingInFailed,
      loggingOtpIn: loggingOtpIn,
      showLoginOtpError: loggingOtpInFailed,
      touched: touched,
      email: '',
      password: '',
      otpEmail: ''
    });
  }

  onBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  onLoginErrorClose() {
    this.setState({
      showLoginError: false
    });
  }

  onOtpLoginErrorClose() {
    this.setState({
      showLoginOtpError: false
    });
  }

  validateLogin(email, password) {
    return {
      email: email.length === 0,
      password: password.length === 0
    };
  }

  validateOtpLogin(otpEmail) {
    return {
      otpEmail: otpEmail.length === 0
    };
  }

  onEmailChange(e) {
    this.setState({
      email: e.currentTarget.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.currentTarget.value
    });
  }

  onOtpEmailChange(e) {
    this.setState({
      otpEmail: e.currentTarget.value
    });
  }

  onSignIn() {
    let touched = Object.assign({}, this.state.touched);
    touched.email = true;
    touched.password = true;
    let otpMode = false;
    this.setState({touched, otpMode});

    const errors = this.validateLogin(
      this.state.email, 
      this.state.password
    );

    if (errors['email'] || errors['password']) {
      return;
    }
    this.props.dispatch(authActions.login(this.state.email, this.state.password));
  }

  onContinue() {
    let touched = Object.assign({}, this.state.touched);
    touched.otpEmail = true;
    let otpMode = true;
    this.setState({touched, otpMode});

    const errors = this.validateOtpLogin(
      this.state.otpEmail 
    );

    if (errors['otpEmail']) {
      return;
    }

    this.props.dispatch(authActions.loginOTP(this.state.otpEmail));
  }

  render() {
    const loginErrors = this.validateLogin(
      this.state.email, 
      this.state.password
    );

    const otpLoginErrors = this.validateOtpLogin(
      this.state.otpEmail
    );

    const shouldMarkError = (field) => {
      const hasError = loginErrors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    const shouldMarkOtpError = (field) => {
      const hasError = otpLoginErrors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <AuthHeader/>
        <div className="login-view fx fx-hc">
          <div className="login-panel">
            <div className="login-body">
              <div className="fx fx-hc">
                <label className="login-header">LOGIN</label>
              </div>
              <div>
                <Alert 
                  show={!this.state.otpMode && this.state.showLoginError} 
                  onClose={this.onLoginErrorClose}
                  dismissible variant="danger">
                  <div>The username or password you entered is incorrect.</div>
                </Alert>                
              </div>
              <div className="username-view fx fx-col">
                <label className="auth-label">Email of Phone number</label>
                <input type="text" 
                  className={shouldMarkError('email') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('email')}
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  id="username" />
                { shouldMarkError('email') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
              <div className="password-view fx fx-col">
                <label className="auth-label">Password</label>
                <input type="password" 
                  className={shouldMarkError('password') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('password')}
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  id="password" />
                { shouldMarkError('password') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
              <div className="signin-view fx fx-r-align">
                <button className="auth-button"
                  disabled={this.state.loggingIn}
                  onClick={this.onSignIn}>Sign In</button>
              </div>
              <div className="login-forgot-password-view">
                <Link className="forgot-password-link" to="/forgot-password">Forgot Password</Link>
              </div>
            </div>
            <div className="login-option-view w-100 fx fx-c">
              <div className="login-option-label">Not Account, Please&nbsp;</div>
              <Link to="/create-account" className="login-option-link">Create Account</Link>
            </div>
          </div>

          <div className="login-or-panel">
            <div className="fx fx-c h-100">
              <label className="login-or-label">OR</label>
            </div>
          </div>

          <div className="login-otp-panel">
            <div className="login-otp-body">
              <div className="fx fx-hc">
                <label className="login-header">LOGIN</label>
              </div>
              <div>
                <Alert 
                  show={this.state.otpMode && this.state.showLoginOtpError} 
                  onClose={this.onOtpLoginErrorClose}
                  dismissible variant="danger">
                  <div>The email or phone you entered is incorrect.</div>
                </Alert>                
              </div>
              <div className="username-view fx fx-col">
                <label className="auth-label">Email of Phone number</label>
                <input type="text" 
                  className={shouldMarkOtpError('otpEmail') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('otpEmail')}
                  value={this.state.otpEmail}
                  onChange={this.onOtpEmailChange}
                  id="otpUsername" />
                { shouldMarkOtpError('otpEmail') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
              <div className="signin-view fx fx-r-align">
                <button className="auth-button"  
                  disabled={this.state.loggingOtpIn}
                  onClick={this.onContinue}>Sign In</button>
              </div>
            </div>
            <div className="login-option-view w-100 fx fx-c">
              <div className="login-option-label">Not Account, Please&nbsp;</div>
              <Link to="/create-account" className="login-option-link">Create Account</Link>
            </div>
          </div>
        </div>
        <AuthFooter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, loggingInFailed, loggedIn, loggingOtpIn, loggingOtpInFailed, loggedOtpIn } = state.login;
  return {
    loggingIn,
    loggingInFailed,
    loggedIn,
    loggingOtpIn,
    loggingOtpInFailed,
    loggedOtpIn
  };
}

const connectedLogin = withRouter(connect(mapStateToProps)(Login));

export { connectedLogin as Login };