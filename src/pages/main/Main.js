import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import './Main.css';

import { Header } from './header';
import { Footer } from './footer';
import { Dashboard } from './dashboard';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <div className="app-main">
        <Header />
        <Dashboard/>
        <Footer />
      </div>
  	);
  }
}

const connectedMain = withRouter(Main);

export { connectedMain as Main };