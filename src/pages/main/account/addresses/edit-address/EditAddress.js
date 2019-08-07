import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Modal, Alert } from 'react-bootstrap';
import './EditAddress.css';

import { accountActions } from '../../../../../actions';

class EditAddress extends Component {
  constructor(props) {
    super(props);

    let address = this.props.address;
    let name = address.name;
    let area = address.area;
    let building = address.building;
    let city = address.city;
    let eastWest = address.eastWest;
    let exact = address.exact;
    let floor = address.floor;
    let landmark = address.landmark;
    let lane = address.lane;
    let road = address.road;
    let room = address.room;
    let zipCode = address.zipCode;
    let chawl = address.chawl;
    let state = address.state;

    this.state = {
      showAddressError: false,
      updatingAddress: false,
      address: address,
      name: name,
      area: area,
      building: building,
      city: city,
      eastWest: eastWest,
      exact: exact,
      floor: floor,
      landmark: landmark,
      lane: lane,
      road: road,
      room: room,
      zipCode: zipCode,
      chawl: chawl,
      state: state,
      touched: {
        name: false,
        area: false,
        building: false,
        city: false,
        eastWest: false,
        exact: false,
        floor: false,
        landmark: false,
        lane: false,
        road: false,
        room: false,
        zipCode: false,
        chawl: false,
        state: false
      }
    };

    this.onHide = this.onHide.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.onNameChange = this.onNameChange.bind(this);
    this.onAreaChange = this.onAreaChange.bind(this);
    this.onBuildingChange = this.onBuildingChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onEastWestChange = this.onEastWestChange.bind(this);
    this.onExactChange = this.onExactChange.bind(this);
    this.onFloorChange = this.onFloorChange.bind(this);
    this.onLandmarkChange = this.onLandmarkChange.bind(this);
    this.onLaneChange = this.onLaneChange.bind(this);
    this.onRoadChange = this.onRoadChange.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
    this.onZipCodeChange = this.onZipCodeChange.bind(this);
    this.onChawlChange = this.onChawlChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let addressUpdated = nextProps.addressUpdated ? nextProps.addressUpdated : false;
    if (addressUpdated) {
      this.props.onHide();
      return;
    }
    let updatingAddress = nextProps.updatingAddress ? nextProps.updatingAddress: false;
    let updatingAddressFailed = nextProps.updatingAddressFailed ? nextProps.updatingAddressFailed: false;

    this.setState({
      updatingAddress: updatingAddress,
      showAddressError: updatingAddressFailed
    });
  }


  onHide() {
    this.props.onHide();
  }

  validate(name, area, building, city, eastWest, exact, floor, landmark, lane, road, room, zipCode, chawl, state) {
    return {
      name: name.length === 0,
      area: area.length === 0,
      building: building.length === 0,
      city: city.length === 0,
      eastWest: eastWest.length === 0,
      exact: exact.length === 0,
      floor: floor.length === 0,
      landmark: landmark.length === 0,
      lane: lane.length === 0,
      road: road.length === 0,
      room: room.length === 0,
      zipCode: zipCode.length === 0,
      chawl: chawl.length === 0,
      state: state.length === 0
    };
  }

  onContinue() {
    let touched = Object.assign({}, this.state.touched);
    touched.name = true;
    touched.area = true;
    touched.building = true;
    touched.city = true;
    touched.eastWest = true;
    touched.exact = true;
    touched.floor = true;
    touched.landmark = true;
    touched.lane = true;
    touched.road = true;
    touched.room = true;
    touched.zipCode = true;
    touched.chawl = true;
    touched.state = true;
    this.setState({touched});

    const errors = this.validate(
      this.state.name, 
      this.state.area,
      this.state.building,
      this.state.city,
      this.state.eastWest,
      this.state.exact,
      this.state.floor,
      this.state.landmark,
      this.state.lane,
      this.state.road,
      this.state.room,
      this.state.zipCode,
      this.state.chawl,
      this.state.state
    );

    if (errors['name'] || errors['area'] || errors['building'] || errors['city'] || errors['eastWest'] || errors['exact'],
      errors['floor'] || errors['landmark'] || errors['lane'] || errors['road'] || errors['room'] || errors['zipCode'],
      errors['chawl'] || errors['state']) {
      return;
    }

    let address = {
      id: this.state.address.id,
      name: this.state.name,
      area: this.state.area,
      building: this.state.building,
      city: this.state.city,
      eastWest: this.state.eastWest,
      exact: this.state.exact,
      floor: this.state.floor,
      landmark: this.state.landmark,
      lane: this.state.lane,
      road: this.state.road,
      room: this.state.room,
      zipCode: this.state.zipCode,
      chawl: this.state.chawl,
      state: this.state.state,
      latitude: 201.973512,
      longitude: 401.354235
    };
    this.props.dispatch(accountActions.updateAddress(address));
  }

  onCancel() {
    this.props.onHide();
  }

  onErrorClose() {
    this.setState({
      showAddressError: false
    });
  }

  onBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  onNameChange(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }

  onAreaChange(e) {
    this.setState({
      area: e.currentTarget.value
    });
  }

  onBuildingChange(e) {
    this.setState({
      building: e.currentTarget.value
    });
  }

  onCityChange(e) {
    this.setState({
      city: e.currentTarget.value
    });
  }

  onEastWestChange(e) {
    this.setState({
      eastWest: e.currentTarget.value
    });
  }

  onExactChange(e) {
    this.setState({
      exact: e.currentTarget.value
    });
  }

  onFloorChange(e) {
    this.setState({
      floor: e.currentTarget.value
    });
  }

  onLandmarkChange(e) {
    this.setState({
      landmark: e.currentTarget.value
    });
  }

  onLaneChange(e) {
    this.setState({
      lane: e.currentTarget.value
    });
  }

  onRoadChange(e) {
    this.setState({
      road: e.currentTarget.value
    });
  }

  onRoomChange(e) {
    this.setState({
      room: e.currentTarget.value
    });
  }

  onZipCodeChange(e) {
    this.setState({
      zipCode: e.currentTarget.value
    });
  }

  onChawlChange(e) {
    this.setState({
      chawl: e.currentTarget.value
    });
  }

  onStateChange(e) {
    this.setState({
      state: e.currentTarget.value
    });
  }


  render() {
    const errors = this.validate(
      this.state.name, 
      this.state.area,
      this.state.building,
      this.state.city,
      this.state.eastWest,
      this.state.exact,
      this.state.floor,
      this.state.landmark,
      this.state.lane,
      this.state.road,
      this.state.room,
      this.state.zipCode,
      this.state.chawl,
      this.state.state
    );

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

  	return (
      <div className="editaddress-container">
        <Modal show={true} onHide={this.onHide}>
          <Modal.Header closeButton>
            <div>
              <div className="editaddress-modal-title">Update Delivery Address</div>
              <div className="editaddress-modal-subtitle">Please enter the accurate address, it will help us to serve you better</div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="editaddress-item-group">
              <div className="editaddress-item-label">Name</div>
              <input type="text" 
                className={shouldMarkError('name') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('name')}
                id="name" 
                placeholder="Name"
                onChange={this.onNameChange}
                value={this.state.name} />
              { shouldMarkError('name') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Area</div>
              <input type="text" 
                className={shouldMarkError('area') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('area')}
                id="area" 
                placeholder="Area"
                onChange={this.onAreaChange}
                value={this.state.area} />
              { shouldMarkError('area') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Building</div>
              <input type="text" 
                className={shouldMarkError('building') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('building')}
                id="building" 
                placeholder="Building"
                onChange={this.onBuildingChange}
                value={this.state.building} />
              { shouldMarkError('building') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group addaddress-mt-5">
              <div className="editaddress-item-label">City</div>
              <input type="text" 
                className={shouldMarkError('city') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('city')}
                id="city" 
                placeholder="City"
                onChange={this.onCityChange}
                value={this.state.city} />
              { shouldMarkError('city') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">East West</div>
              <input type="text" 
                className={shouldMarkError('eastWest') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('eastWest')}
                id="eastWest" 
                placeholder="East West"
                onChange={this.onEastWestChange}
                value={this.state.eastWest} />
              { shouldMarkError('eastWest') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Exact</div>
              <input type="text" 
                className={shouldMarkError('exact') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('exact')}
                id="exact" 
                placeholder="Exact"
                onChange={this.onExactChange}
                value={this.state.exact} />
              { shouldMarkError('exact') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Floor</div>
              <input type="text" 
                className={shouldMarkError('floor') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('floor')}
                id="floor" 
                placeholder="Floor"
                onChange={this.onFloorChange}
                value={this.state.floor} />
              { shouldMarkError('floor') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Landmark</div>
              <input type="text" 
                className={shouldMarkError('landmark') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('landmark')}
                id="landmark" 
                placeholder="Landmark"
                onChange={this.onLandmarkChange}
                value={this.state.landmark} />
              { shouldMarkError('landmark') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Lane</div>
              <input type="text" 
                className={shouldMarkError('lane') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('lane')}
                id="lane" 
                placeholder="Lane"
                onChange={this.onLaneChange}
                value={this.state.lane} />
              { shouldMarkError('lane') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Road</div>
              <input type="text" 
                className={shouldMarkError('road') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('road')}
                id="road" 
                placeholder="Road"
                onChange={this.onRoadChange}
                value={this.state.road} />
              { shouldMarkError('road') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Room</div>
              <input type="text" 
                className={shouldMarkError('room') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('room')}
                id="room" 
                placeholder="Room"
                onChange={this.onRoomChange}
                value={this.state.room} />
              { shouldMarkError('room') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Zip Code</div>
              <input type="text" 
                className={shouldMarkError('zipCode') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('zipCode')}
                id="zipCode" 
                placeholder="Zip Code"
                onChange={this.onZipCodeChange}
                value={this.state.zipCode} />
              { shouldMarkError('zipCode') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">Chawl</div>
              <input type="text" 
                className={shouldMarkError('chawl') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('chawl')}
                id="chawl" 
                placeholder="Chawl"
                onChange={this.onChawlChange}
                value={this.state.chawl} />
              { shouldMarkError('chawl') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-item-group editaddress-mt-5">
              <div className="editaddress-item-label">State</div>
              <input type="text" 
                className={shouldMarkError('state') ? 'editaddress-item-input editaddress-error' : 'editaddress-item-input'}
                onBlur={this.onBlur('state')}
                id="state" 
                placeholder="State"
                onChange={this.onStateChange}
                value={this.state.state} />
              { shouldMarkError('state') 
                ? (
                  <label className="editaddress-error-label">You cant leave this empty.</label>
                ) 
                : null }
            </div>
            <div className="editaddress-mt-5">
              <Alert 
                show={this.state.showAddressError} 
                onClose={this.onErrorClose}
                dismissible variant="danger">
                <div>There is an issue while updating address. Please try again later.</div>
              </Alert>                
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="fx fx-space-bw">
              <div>
              </div>
              <div className="fx">
                <button 
                  className="editaddress-modal-button editaddress-mr-10" 
                  disabled={this.state.updatingAddress}
                  onClick={this.onCancel}>
                  Cancel
                </button>
                <button 
                  className="editaddress-modal-button" 
                  disabled={this.state.updatingAddress}
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
  const { updatingAddress, updatingAddressFailed, addressUpdated } = state.address;
  return {
    updatingAddress,
    updatingAddressFailed,
    addressUpdated
  };
}

const connectedEditAddress = withRouter(connect(mapStateToProps)(EditAddress));

export { connectedEditAddress as EditAddress };