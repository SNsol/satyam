import { accountConstants } from '../constants';

const initialState = { addresses: [] } 

export function address(state = initialState, action) {
  switch (action.type) {
    case accountConstants.GET_ADDRESSES_REQUEST:
      return { 
        addresses: [],
        gettingAddress: true 
      };
    case accountConstants.GET_ADDRESSES_SUCCESS:
      return {
        addresses: action.addresses
      };
    case accountConstants.GET_ADDRESSES_FAILURE:
      return {
        addresses: [],
        gettingAddressFailed: true
      };
    case accountConstants.ADD_ADDRESS_REQUEST:
      return { 
        addresses: state.addresses,
        addingAddress: true 
      };
    case accountConstants.ADD_ADDRESS_SUCCESS:
      return {
        addressAdded: true,
        addresses: [...state.addresses, action.address]
      };
    case accountConstants.ADD_ADDRESS_FAILURE:
      return {
        addresses: state.addresses,
        addingAddressFailed: true
      };
    case accountConstants.UPDATE_ADDRESS_REQUEST:
      return { 
        addresses: state.addresses,
        updatingAddress: true 
      };
    case accountConstants.UPDATE_ADDRESS_SUCCESS:
      return {
        addressUpdated: true,
        addresses: state.addresses.map(address => {
          if (address.id === action.address.id) {
           return action.address;
          }
          return address;
        })
      };
    case accountConstants.UPDATE_ADDRESS_FAILURE:
      return {
        addresses: state.addresses,
        updatingAddressFailed: true
      };
    case accountConstants.REMOVE_ADDRESS_REQUEST:
      return { 
        addresses: state.addresses,
        removingAddress: true 
      };
    case accountConstants.REMOVE_ADDRESS_SUCCESS:
      return {
        addressRemoved: true,
        addresses: state.addresses.filter(address => address.id !== action.addressId)
      };
    case accountConstants.REMOVE_ADDRESS_FAILURE:
      return {
        addresses: state.addresses,
        removingAddressFailed: true
      };
    default:
      return state
  }
}