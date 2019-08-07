import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Modal, Alert } from 'react-bootstrap';
import './RemoveAddress.css';

import { accountActions } from '../../../../../actions';

class RemoveAddress extends Component {
  constructor(props) {
    super(props);

    let address = this.props.address ? this.props.address : {};
    this.state = {
      address: address,
      showAddressError: false,
      removingAddress: false
  	};

  	this.onHide = this.onHide.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let addressRemoved = nextProps.addressRemoved ? nextProps.addressRemoved : false;
    if (addressRemoved) {
      this.props.onHide();
      return;
    }
    let removingAddress = nextProps.removingAddress ? nextProps.removingAddress: false;
    let removingAddressFailed = nextProps.removingAddressFailed ? nextProps.removingAddressFailed: false;

    this.setState({
      removingAddress: removingAddress,
      showAddressError: removingAddressFailed
    });
  }

  onHide() {
    this.props.onHide();
  }

  onErrorClose() {
    this.setState({
      showAddressError: false
    });
  }

  onContinue() {
    let addressId = this.state.address.id;
    this.props.dispatch(accountActions.removeAddress(addressId));
  }

  onCancel() {
    this.props.onHide();
  }

  render() {
  	return (
      <div className="removeaddress-container">
      	<Modal show={true} onHide={this.onHide}>
          <Modal.Header closeButton>
           <div>
              <div className="removeaddress-modal-title">Delete Delivery Address</div>
              <div className="removeaddress-modal-subtitle">Do you really want to delete the delivery address?</div>
            </div>
          </Modal.Header>
          <Alert 
            show={this.state.showAddressError} 
            onClose={this.onErrorClose}
            dismissible variant="danger">
            <div>There is an issue while removing address. Please try again later.</div>
          </Alert>                
          <Modal.Footer>
            <div className="fx fx-space-bw">
              <div>
              </div>
              <div className="fx">
                <button 
                  className="removeaddress-modal-button removeaddress-mr-10" 
                  disabled={this.state.removingAddress}
                  onClick={this.onCancel}>
                  Cancel
                </button>
                <button 
                  className="removeaddress-modal-button" 
                  disabled={this.state.removingAddress}
                  onClick={this.onContinue}>
                  Continue
                </button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
  	);
  }
}

function mapStateToProps(state) {
  const { removingAddress, removingAddressFailed, addressRemoved } = state.address;
  return {
    removingAddress,
    removingAddressFailed,
    addressRemoved
  };
}

const connectedRemoveAddress = withRouter(connect(mapStateToProps)(RemoveAddress));

export { connectedRemoveAddress as RemoveAddress };