import React, { Component } from 'react';
import './Orders.css';

class Orders extends Component {
  constructor(props) {
    super(props);
  }

  noOrdersView() {
    return (
      <div className="orders-no-orders-view">
        <div className="orders-no-orders-label">
          You have no orders yet..
        </div>
      </div>
    );
  }

  render() {
  	let noOrdersView = this.noOrdersView();
  	return (
      <div className="orders-view">
        <div className="orders-header fx fx-vc">
          <div>
            <div className="orders-header-label">Your Orders</div>
          </div>
        </div>
        <div className="orders-list-view">
          { noOrdersView }
        </div>
      </div>
  	);
  }
}

export { Orders };