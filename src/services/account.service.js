import { apiUrl } from '../helpers';

export const accountService = {
  getAddresses,
  addAddress,
  updateAddress,
  removeAddress
};

function getAddresses() {
  const url = apiUrl + '/api/Customer/CustomerAddressList';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Authorization': authorization
  };
  const requestOptions = {
    method: 'GET',
    headers: headers
  };
  return fetch(url, requestOptions)
  	.then(response => {
      if (response.ok) {
        return response.json()
      }
      let error = new Error('Failed to Get Address');
      return Promise.reject(error);
    }).then(addressesArray => {
       let addresses = addressesArray.map(address => {
        return {
          id: address.AddressID ? address.AddressID : '',
          name: address.CustomerName ? address.CustomerName : '',
          area: address.Area ? address.Area : '',
          building: address.Building ? address.Building : '',
          city: address.City ? address.City : '',
          eastWest: address.East_West ? address.East_West : '',
          exact: address.Exact ? address.Exact : '',
          floor: address.Floor ? address.Floor : '',
          landmark: address.Landmark ? address.Landmark : '',
          lane: address.Lane ? address.Lane : '',
          road: address.Road ? address.Road : '',
          room: address.Room ? address.Room : '',
          zipCode: address.ZIPCode ? address.ZIPCode : '',
          chawl: address.chawl ? address.chawl : '',
          state: address.state ? address.state : '',
          latitude: address.latitude ? address.latitude : null,
          longitude: address.longitude ? address.longitude : null
        };
      });
      return addresses;
  	});
}

function addAddress(address) {
  const url = apiUrl + '/api/Customer/InsertAddress';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
  	"Content-Type": "application/json",
    'Authorization': authorization
  };
  let body = {
    'Id': user.customerId,
    'Area': address.area,
    'Building': address.building,
    'City': address.city,
    'CustomerName': address.name,
    'East_West': address.eastWest,
    'Exact': address.exact,
    'Floor': address.floor,
    'Landmark': address.landmark,
    'Lane': address.lane,
    'Road': address.road,
    'Room': address.room,
    'ZIPCode': address.zipCode,
    'chawl': address.chawl,
    'state': address.state,
    'latitude': address.latitude,
    'longitude': address.longitude
  }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions)
  	.then(response => {
      if (response.ok) {
      	return response.text()
      }
      let error = new Error('Failed to Add Address');
  	  return Promise.reject(error);
  	}).then(responseText => {
      let addedAddress = address;
      addedAddress.id = responseText ? responseText : '';
  	  return addedAddress;
  	});
}

function updateAddress(address) {
  const url = apiUrl + '/api/Customer/EditAddress';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
  	"Content-Type": "application/json",
    'Authorization': authorization
  };
  let body = {
    'Id': user.customerId,
    'Area': address.area,
    'Building': address.building,
    'City': address.city,
    'CustomerName': address.name,
    'East_West': address.eastWest,
    'Exact': address.exact,
    'Floor': address.floor,
    'Landmark': address.landmark,
    'Lane': address.lane,
    'Road': address.road,
    'Room': address.room,
    'ZIPCode': address.zipCode,
    'chawl': address.chawl,
    'state': address.state,
    'latitude': address.latitude,
    'longitude':address.longitude,
    'AddressID': address.id
  }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };

  return fetch(url, requestOptions)
  	.then(response => {
      if (response.ok) {
      	return response.text()
      }
      let error = new Error('Failed to Edit Address');
	    return Promise.reject(error);
  	}).then(response => {
      let updatedAddress = address;
  	  return updatedAddress;
  	});
}

function removeAddress(addressId) {
  const url = apiUrl + '/api/Customer/DeleteAddress?AddressID=' + addressId;

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
  	"Content-Type": "application/json",
    'Authorization': authorization
  };
  const requestOptions = {
    method: 'POST',
    headers: headers
  };
  return fetch(url, requestOptions)
  	.then(response => {
      if (response.ok) {
      	return response.text()
      }
      let error = new Error('Failed to Remove Address');
      return Promise.reject(error);
  	}).then(result => {
  	  return addressId;
  	});
}