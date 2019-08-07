import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import './DashboardCategories.css';

import categoryIcon from '../../../../assets/images/category.png';
import disclosureIcon from '../../../../assets/images/disclosure.png';

class DashboardCategories extends Component {
  constructor(props) {
    super(props);

    let categories = this.props.categories ? this.props.categories : [];
    this.state = {
      categories: categories
    };

    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.categoriesDom = this.categoriesDom.bind(this);
  }

  onCategoryClick(category) {
    let categoryId = category.categoryID ? category.categoryID : "";
    let categoryName = category.categoryName ? category.categoryName : "";
    let path = "/category/" + categoryName.replace(/\//g, '%2F') + "/" + categoryId;
    this.props.history.push(path);
  }

  categoriesDom(categories) {
    var self = this;
    return categories.map(function(category) {
      return (
        <div className="dashboard-category-item fx fx-vc" key={category.categoryID} onClick={() => self.onCategoryClick(category)}>
          <div className="dashboard-category-item-label">
            {category.categoryName}
          </div>
          <div className="dashboard-category-item-icon-view fx fx-c">
            <img src={disclosureIcon} className="dashboard-category-item-icon"/>
          </div>
        </div>
      )
    });
  }

  render() {
    let categories = this.state.categories ? this.state.categories : [];
    let categoriesDom = this.categoriesDom(categories);
  	return (
      <div className="dashboard-categories-container">
        <div className="dashboard-category-header fx fx-vc">
          <img src={categoryIcon} className="dashboard-category-header-icon"/>
          <div className="dashboard-category-header-label">CATEGORIES</div>
        </div>
        <div className="dashboard-categories-item-view">
          {categoriesDom}
        </div>
      </div>
  	);
  }
}

function mapStateToProps(state) {
  return { };
}

const connectedDashboardCategories = withRouter(connect(mapStateToProps)(DashboardCategories));

export { connectedDashboardCategories as DashboardCategories };