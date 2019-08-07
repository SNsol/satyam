import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import './ForgotPassword.css';

import { AuthHeader } from '../auth-header';
import { AuthFooter } from '../auth-footer';
import { authActions } from '../../../actions';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      forgotPasswordInProgress: false,
      showError: false,
      touched: {
        email: false,
      }
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let forgotPasswordSucceed = nextProps.forgotPasswordDetails ? true : false;
    if (forgotPasswordSucceed) {
      this.props.history.push('/verify-otp');
      return;
    }
    let forgotPasswordInProgress = nextProps.forgotPasswordInProgress ? true: false;
    let forgotPasswordFailed = nextProps.forgotPasswordFailed ? true: false;

    let touched = Object.assign({}, this.state.touched);
    touched.email = false;
    this.setState({
      forgotPasswordInProgress: forgotPasswordInProgress,
      showError: forgotPasswordFailed,
      touched: touched,
      email: '',
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

  validate(email) {
    return {
      email: email.length === 0
    };
  }

  onEmailChange(e) {
    this.setState({
      email: e.currentTarget.value
    });
  }

  onContinue() {
    let touched = Object.assign({}, this.state.touched);
    touched.email = true;
    this.setState({touched});

    const errors = this.validate(
      this.state.email
    );

    if (errors['email']) {
      return;
    }

    this.props.dispatch(authActions.forgotPassword(this.state.email));
  }

  render() {
    const errors = this.validate(
      this.state.email
    );

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <AuthHeader />
        <div className="forgot-password-view fx fx-hc">
          <div className="forgot-password-panel">
            <div className="forgot-password-body">
              <div className="fx fx-hc">
                <label className="forgot-password-header">PASSWORD ASSISTANCE</label>
              </div>
              <div>
                <Alert 
                  show={this.state.showError} 
                  onClose={this.onErrorClose}
                  dismissible variant="danger">
                  <div>The email or phone you entered is incorrect.</div>
                </Alert>                
              </div>
              <div className="forgot-password-guide-view fx fx-col">
                <label className="forgot-password-guide-label">Enter the Email address or Mobile Phone number associated with your satyam account</label>
              </div>
              <div className="forgot-password-email-view fx fx-col">
                <label className="auth-label">Email or Phone number</label>
                <input type="text" 
                  className={shouldMarkError('email') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('email')}
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  id="email" />
                { shouldMarkError('email') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
              <div className="forgot-password-continue-view fx fx-r-align">
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
  const { forgotPasswordInProgress, forgotPasswordFailed, forgotPasswordDetails } = state.forgotPassword;
  return {
    forgotPasswordInProgress,
    forgotPasswordFailed,
    forgotPasswordDetails
  };
}

const connectedForgotPassword = withRouter(connect(mapStateToProps)(ForgotPassword));

export { connectedForgotPassword as ForgotPassword };