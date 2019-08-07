import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './Dashboard.css';

import { DashboardCategories } from './dashboard-categories';
import { DashboardHotDeals } from './dashboard-hot-deals';
import { DashboardWelcome } from './dashboard-welcome';
import { BestSelling } from './best-selling';
import { DashboardClub} from './dashboard-club';
import { DashboardPromotions} from './dashboard-promotions';
import { DashboardSpecialOffers} from './dashboard-special-offers';
import { TopSelling } from './top-selling';
import { productActions } from '../../../actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gettingDashboardDetails: false,
      categories: [],
      bestSelling: [],
      topSelling: []
    };

    this.loaderView = this.loaderView.bind(this);
    this.productsView = this.productsView.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let gettingDashboardDetails = nextProps.gettingDashboardDetails ? true : false;
    let categories = nextProps.categories ? nextProps.categories : [];
    let bestSelling = nextProps.bestSelling ? nextProps.bestSelling : [];
    let topSelling = nextProps.topSelling ? nextProps.topSelling : [];

    this.setState({
      gettingDashboardDetails: gettingDashboardDetails,
      categories: categories,
      bestSelling: bestSelling,
      topSelling: topSelling
    });
  }

  componentDidMount() {
    this.props.dispatch(productActions.dashboardDetails());
  }

  loaderView() {
    return (
      <div className="dashboard-loader-view fx fx-c">
        <Loader 
           type="ThreeDots"
           color="#FF4D4D"
           height="80" 
           width="80"
        />
      </div>
    );
  }

  productsView() {
    let categories = this.state.categories;
    let bestSelling = this.state.bestSelling;
    let topSelling = this.state.topSelling;
    return (
      <div className="dashboard-container mx-auto">
        <div className="dashboard-first-view fx">
          <div className="dashboard-category-view">
            <DashboardCategories categories={categories}/>
          </div>
          <div className="dashboard-welcome-view">
            <DashboardWelcome />
          </div>
        </div>
        <div className="dashboard-second-view fx">
          <div className="dashboard-hot-deals-view">
            <DashboardHotDeals />
          </div>
          <div className="dashboard-best-selling-view">
            <BestSelling products={bestSelling} />
          </div>
        </div>
         <div className="dashboard-third-view fx">
          <div className="dashboard-club-view">
            <DashboardClub />
          </div>
          <div className="dashboard-promotions-view">
            <DashboardPromotions />
          </div>
        </div>
        <div className="dashboard-fourth-view fx">
          <div className="dashboard-special-offers-view">
            <DashboardSpecialOffers />
          </div>
          <div className="dashboard-top-selling-view">
            <TopSelling products={topSelling} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    let loaderView = this.loaderView();
    let productsView = this.productsView();
    let dashboardView = this.state.gettingDashboardDetails ? loaderView : productsView;

  	return (
      <div className="dashboard-view">
        { dashboardView }
      </div>
  	);
  }
}

function mapStateToProps(state) {
  const { gettingDashboardDetails, gettingDashboardDetailsFailed, gettingDashboardDetailsSuccess, categories, bestSelling, topSelling } = state.category;
  return {
    gettingDashboardDetails,
    gettingDashboardDetailsFailed,
    gettingDashboardDetailsSuccess,
    categories,
    bestSelling,
    topSelling
  };
}

const connectedDashboard = withRouter(connect(mapStateToProps)(Dashboard));

export { connectedDashboard as Dashboard };