import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const OtpRefreshRoute = ({ component: Component, otpDetails, ...rest }) => {
  var isLoggedIn = false;
  let user =  localStorage.getItem('user');
  if (user && user != null) {
    isLoggedIn = true;
  }
  let haveOtpDetails = otpDetails ? true: false;
  let proceedToPage = (!isLoggedIn && haveOtpDetails);

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
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          ) 
        )
      }
    />
  )
}

function mapStateToProps(state) {
  const { otpDetails } = state.login;
  return {
    otpDetails
  };
}

export default connect(mapStateToProps)(OtpRefreshRoute);  