import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './Addresses.css';

import { AddAddress } from './add-address';
import { EditAddress } from './edit-address';
import { RemoveAddress } from './remove-address';
import { accountActions } from '../../../../actions';
import addAddressIncrementIcon from '../../../../assets/images/addcart-increment-icon.png';
import closeButton from '../../../../assets/images/close-button.png';

class Addresses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gettingAddress: false,
      addresses: [],
      selectedAddress: null,
      showAddAddress: false,
      showEditAddress: false,
      showRemoveAddress: false
    };

    this.loaderView = this.loaderView.bind(this);
    this.addressListView = this.addressListView.bind(this);
    this.noAddressView = this.noAddressView.bind(this);
    this.addressItemView = this.addressItemView.bind(this);
    this.onRemoveAddress = this.onRemoveAddress.bind(this);
    this.onEditAddress = this.onEditAddress.bind(this);
    this.onAddAddress = this.onAddAddress.bind(this);
    this.onEditAddressHide = this.onEditAddressHide.bind(this);
    this.onAddAddressHide = this.onAddAddressHide.bind(this);
    this.onRemoveAddressHide = this.onRemoveAddressHide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let gettingAddress = nextProps.gettingAddress ? nextProps.gettingAddress : false;
    let addresses = nextProps.addresses ? nextProps.addresses : [];
    this.setState({
      gettingAddress: gettingAddress,
      addresses: addresses
    });
  }

  componentDidMount() {
    this.props.dispatch(accountActions.getAddresses());
  }

  onRemoveAddressHide() {
    this.setState({ 
      selectedAddress: null,
      showRemoveAddress: false
    });
  }

  onRemoveAddress(address) {
    this.setState({ 
      selectedAddress: address,
      showRemoveAddress: true
    });
  }

  onEditAddressHide() {
    this.setState({ 
      selectedAddress: null,
      showEditAddress: false
    });
  }

  onEditAddress(address) {
    this.setState({ 
      selectedAddress: address,
      showEditAddress: true
    });
  }

  onAddAddressHide() {
    this.setState({ 
      showAddAddress: false
    });
  }

  onAddAddress() {
    this.setState({ 
      showAddAddress: true
    });
  }

  loaderView() {
    return (
      <div className="address-loader-view fx fx-c">
        <Loader 
          type="ThreeDots"
          color="#FF4D4D"
          height="80" 
          width="80"
        />
      </div>
    );
  }

  noAddressView() {
    return (
      <div className="address-no-address-view">
        <div className="address-no-address-label">
          You have no saved address..
        </div>
      </div>
    );
  }

  addressItemView(address) {
    let customerName = address.name;
    let building = address.building;
    let area = address.area;
    let city = address.city;
    let state = address.state;
    let zipCode = address.zipCode;

    return (
      <div className="address-item-view fx">
        <div className="address-item-detail-view" onClick={() => this.onEditAddress(address)}>
          <div className="address-item-label">
            <span className="address-item-header-label">Name:&nbsp;</span> { customerName }
          </div>
          <div className="address-item-label">
            <span className="address-item-header-label">Building:&nbsp;</span> { building }
          </div>
          <div className="address-item-label">
            <span className="address-item-header-label">Area:&nbsp;</span> { area }
          </div>
          <div className="address-item-label">
            <span className="address-item-header-label">City:&nbsp;</span> { city }
          </div>
          <div className="address-item-label">
            <span className="address-item-header-label">State:&nbsp;</span> { state }
          </div>
          <div className="address-item-label">
            <span className="address-item-header-label">Zip Code:&nbsp;</span> { zipCode }
          </div>
        </div>
        <div className="address-delete-view fx fx-hc" onClick={() => this.onRemoveAddress(address)}>
          <img src={closeButton} className="address-close-image"/>
        </div>
      </div>
    );
  }

  addressListView() {
    let addresses = this.state.addresses;
    if (!Array.isArray(addresses)) {
      let noAddressView = this.noAddressView();
      return (
        <div className="address-list-container">
          {noAddressView}
        </div>
      );
    }

    if (addresses.length <= 0) {
      let noAddressView = this.noAddressView();
      return (
        <div className="address-list-container">
          {noAddressView}
        </div>
      );
    }

    var self = this;
    let addressListDom = addresses.map(function(address) {
      let addressDom = self.addressItemView(address);
      return (
        <div className="address-item-container-view" key={address.id}>
          { addressDom }
        </div>
      )
    });

    return (
      <div className="address-list-container">
        { addressListDom }
      </div>
    );
  }

  addAddressView() {
    return (
      <AddAddress show={true} onHide={this.onAddAddressHide} />
    );
  }

  editAddressView() {
    let selectedAddress = this.state.selectedAddress;
    return (
      <EditAddress show={true} address={selectedAddress} onHide={this.onEditAddressHide} />
    );
  }

  removeAddressView() {
    let selectedAddress = this.state.selectedAddress;
    return (
      <RemoveAddress show={true} address={selectedAddress} onHide={this.onRemoveAddressHide} />
    );
  }

  render() {
    let loaderView = this.loaderView();
    let addressListView = this.addressListView();
    let mainView = this.state.gettingAddress ? loaderView : addressListView;
    let addAddressView = this.addAddressView();
    let editAddressView = this.editAddressView();
    let removeAddressView = this.removeAddressView();

  	return (
      <div className="addresses-view">
      	<div className="address-header fx fx-vc fx-space-bw">
          <div>
            <div className="address-header-label">Addresses</div>
          </div>
          <div>
            <div className="address-addaddress-button fx fx-vc" onClick={this.onAddAddress}>
              <div className="address-addaddress-label">
                ADD ADDRESS
              </div>
              <div className="address-increment-button fx fx-c">
                <img src={addAddressIncrementIcon} className="address-increment-icon"/>
              </div>
            </div>
          </div>
        </div>
        <div className="address-list-view">
          { mainView }
        </div>
        {this.state.showAddAddress ? addAddressView : null}
        {this.state.showEditAddress ? editAddressView : null}
        {this.state.showRemoveAddress ? removeAddressView : null}
      </div>
  	);
  }
}

function mapStateToProps(state) {
  const { gettingAddress, gettingAddressFailed, addresses } = state.address;
  return {
    gettingAddress,
    gettingAddressFailed,
    addresses
  };
}

const connectedAddresses = withRouter(connect(mapStateToProps)(Addresses));

export { connectedAddresses as Addresses };