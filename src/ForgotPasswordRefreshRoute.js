import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ForgotPasswordRefreshRoute = ({ component: Component, forgotPasswordDetails, ...rest }) => {
  var isLoggedIn = false;
  let user =  localStorage.getItem('user');
  if (user && user != null) {
    isLoggedIn = true;
  }
  let haveForgotPasswordDetails = forgotPasswordDetails ? true: false;
  let proceedToPage = (!isLoggedIn && haveForgotPasswordDetails);

  return (
    <Route
      {...rest}
      render={props =>
        proceedToPage ? (
          <Component {...props} />
        ) : (
          isLoggedIn ? (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          ) : (
            <Redirect to={{ pathname: '/forgot-password', state: { from: props.location } }} />
          ) 
        )
      }
    />
  )
}

function mapStateToProps(state) {
  const { forgotPasswordDetails } = state.forgotPassword;
  return {
    forgotPasswordDetails
  };
}

export default connect(mapStateToProps)(ForgotPasswordRefreshRoute);  