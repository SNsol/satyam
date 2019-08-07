import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RegisterRefreshRoute = ({ component: Component, registerDetails, ...rest }) => {
  var isLoggedIn = false;
  let user =  localStorage.getItem('user');
  if (user && user != null) {
    isLoggedIn = true;
  }
  let haveRegisterDetails = registerDetails ? true: false;
  let proceedToPage = (!isLoggedIn && haveRegisterDetails);

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
            <Redirect to={{ pathname: '/create-account', state: { from: props.location } }} />
          ) 
        )
      }
    />
  )
}

function mapStateToProps(state) {
  const { registerDetails } = state.registration;
  return {
    registerDetails
  };
}

export default connect(mapStateToProps)(RegisterRefreshRoute);  