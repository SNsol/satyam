import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import './CreateAccount.css';

import { AuthHeader } from '../auth-header';
import { AuthFooter } from '../auth-footer';
import { authActions } from '../../../actions';

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      phone: '',
      name: '',
      password: '',
      showError: false,
      touched: {
        email: false,
        phone: false,
        name: false,
        password: false
      }
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let registered = nextProps.registerDetails ? true : false;
    if (registered) {
      this.props.history.push('/verify-mobile');
      return;
    }
   
    let registering = nextProps.registering ? true: false;
    let registeringFailed = nextProps.registeringFailed ? true: false;

    let touched = Object.assign({}, this.state.touched);
    touched.email = false;
    touched.phone = false;
    touched.name = false;
    touched.password = false;
    this.setState({
      registering: registering,
      showError: registeringFailed,
      touched: touched,
      email: '',
      phone: '',
      name: '',
      password: ''
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

  validate(email, phone, name, password) {
    return {
      email: email.length === 0,
      phone: phone.length === 0,
      name: name.length === 0,
      password: password.length === 0
    };
  }

  onEmailChange(e) {
    this.setState({
      email: e.currentTarget.value
    });
  }

  onPhoneChange(e) {
    this.setState({
      phone: e.currentTarget.value
    });
  }

  onNameChange(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.currentTarget.value
    });
  }

  onCreate() {
    let touched = Object.assign({}, this.state.touched);
    touched.email = true;
    touched.phone = true;
    touched.name = true;
    touched.password = true;
    this.setState({touched});

    const errors = this.validate(
      this.state.email,
      this.state.phone,
      this.state.name,
      this.state.password
    );

    if (errors['email', 'phone', 'name', 'password']) {
      return;
    }

    let user = {
      'email': this.state.email,
      'password': this.state.password,
      'phone': this.state.phone,
      'name': this.state.name,
    };

    this.props.dispatch(authActions.createAccount(user));
  }


  render() {
    const errors = this.validate(
      this.state.email,
      this.state.phone,
      this.state.name,
      this.state.password
    );

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <AuthHeader />
        <div className="create-account-view fx fx-hc">
          <div className="create-account-panel">
            <div className="create-account-body">
              <div className="fx fx-hc">
                <label className="create-account-header">CREATE ACCOUNT</label>
              </div>
              <div>
                <Alert 
                  show={this.state.showError} 
                  onClose={this.onErrorClose}
                  dismissible variant="danger">
                  <div>There is an issue while creating account. Please try again later.</div>
                </Alert>                
              </div>
              <div className="create-account-name-view fx fx-col">
                <label className="auth-label">Your Name</label>
                <input type="name" 
                  className={shouldMarkError('name') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('name')}
                  value={this.state.name}
                  onChange={this.onNameChange}
                  id="name" />
                { shouldMarkError('name') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
               <div className="create-account-email-view fx fx-col">
                <label className="auth-label">E-Mail</label>
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
              <div className="create-account-phone-view fx fx-col">
                <label className="auth-label">Mobile Number</label>
                <input type="text" 
                  className={shouldMarkError('phone') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('phone')}
                  value={this.state.phone}
                  onChange={this.onPhoneChange}
                  id="phone" />
                { shouldMarkError('phone') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
              <div className="create-account-password-view fx fx-col">
                <label className="auth-label">Password</label>
                <input type="password" 
                  className={shouldMarkError('password') ? "form-control auth-input error" : "form-control auth-input"}
                  onBlur={this.onBlur('password')}
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  id="email" />
                { shouldMarkError('password') 
                  ? (
                    <label className="error-label">You cant leave this empty.</label>
                  ) 
                  : null }
              </div>
              <div className="create-account-create-view fx fx-r-align">
                <button className="auth-button"  
                  disabled={this.state.registering}
                  onClick={this.onCreate}>Create</button>
              </div>
            </div>
            <div className="create-account-option-view w-100 fx fx-c">
              <div className="create-account-option-label">Already have an account?&nbsp;</div>
              <Link to="/login" className="create-account-option-link">Sign In</Link>
            </div>
          </div>
        </div>
        <AuthFooter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering, registeringFailed, registerDetails } = state.registration;
  return {
    registering,
    registeringFailed,
    registerDetails
  };
}

const connectedCreateAccount = withRouter(connect(mapStateToProps)(CreateAccount));

export { connectedCreateAccount as CreateAccount };