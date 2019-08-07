import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import './ResetPassword.css';

import { AuthHeader } from '../auth-header';
import { AuthFooter } from '../auth-footer';
import { authActions } from '../../../actions';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: '',
      confirmPassword: '',
      forgotPasswordInProgress: false,
      showError: false,
      touched: {
        newPassword: false,
        confirmPassword: false
      }
    };

    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let forgotPasswordPasswordResetted = nextProps.forgotPasswordPasswordResetted ? true : false;
    if (forgotPasswordPasswordResetted) {
      this.props.history.push('/');
      return;
    }
  
    let forgotPasswordInProgress = nextProps.forgotPasswordInProgress ? true: false;
    let forgotPasswordFailed = nextProps.forgotPasswordFailed ? true: false;

    let touched = Object.assign({}, this.state.touched);
    touched.otp = false;
    this.setState({
      forgotPasswordInProgress: forgotPasswordInProgress,
      showError: forgotPasswordFailed,
      touched: touched,
      newPassword: '',
      confirmPassword: ''
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

  validate(newPassword, confirmPassword) {
    return {
      newPassword: newPassword.length === 0,
      confirmPassword: confirmPassword.length === 0,
      passwordsEqual: newPassword === confirmPassword
    };
  }

  onNewPasswordChange(e) {
    this.setState({
      newPassword: e.currentTarget.value
    });
  }

  onConfirmPasswordChange(e) {
    this.setState({
      confirmPassword: e.currentTarget.value
    });
  }

  onSave() {
    let touched = Object.assign({}, this.state.touched);
    touched.newPassword = true;
    touched.confirmPassword = true;
    this.setState({touched});

    const errors = this.validate(
      this.state.newPassword,
      this.state.confirmPassword
    );

    if (errors['newPassword', 'confirmPassword']) {
      return;
    }

    let tempToken = this.props.forgotPasswordDetails.tempToken;
    if (!tempToken) {
      console.log("Temp token missing");
      return;
    }

    this.props.dispatch(authActions.resetPassword(tempToken, this.state.newPassword, this.state.confirmPassword));
  }


  render() {
    const errors = this.validate(
      this.state.newPassword,
      this.state.confirmPassword
    );

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <AuthHeader />
        <div className="create-password-view fx fx-hc">
          <div className="create-password-panel">
            <div className="create-password-body">
              <div className="fx fx-hc">
                <label className="create-password-header">CREATE NEW PASSWORD</label>
              </div>
              <div>
                <Alert 
                  show={this.state.showError} 
                  onClose={this.onErrorClose}
                  dismissible variant="danger">
                  <div>The passwords you entered is incorrect.</div>
                </Alert>                
              </div>
              <div className="create-password-guide-view fx fx-col">
                <label className="create-password-guide-label">We'll ask this password whenever you sign in</label>
              </div>
              <div className="create-password-new-view fx fx-col">
                <label className="auth-label">NEW PASSWORD</label>
                <input type="password" 
                  className={shouldMarkError('newPassword') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('newPassword')}
                  value={this.state.newPassword}
                  onChange={this.onNewPasswordChange}
                  id="newPassword" />
                { shouldMarkError('newPassword') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
               <div className="create-password-confirm-view fx fx-col">
                <label className="auth-label">CONFIRM PASSWORD</label>
                <input type="password" 
                  className={shouldMarkError('confirmPassword') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('confirmPassword')}
                  value={this.state.confirmPassword}
                  onChange={this.onConfirmPasswordChange}
                  id="confirmPassword" />
                { shouldMarkError('confirmPassword') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
              <div className="create-password-option-view fx fx-r-align">
                <button className="auth-button"  
                  disabled={this.state.forgotPasswordInProgress}
                  onClick={this.onSave}>Save</button>
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
  const { forgotPasswordDetails, forgotPasswordInProgress, forgotPasswordFailed, forgotPasswordPasswordResetted } = state.forgotPassword;
  return {
    forgotPasswordDetails,
    forgotPasswordInProgress,
    forgotPasswordFailed,
    forgotPasswordPasswordResetted
  };
}

const connectedResetPassword = withRouter(connect(mapStateToProps)(ResetPassword));

export { connectedResetPassword as ResetPassword };