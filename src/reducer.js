import {
  UPDATE_DRIVER_SELECTION,
  UPDATE_LOCATION_SELECTION,
  UPDATE_ORDER_INFO,
} from "./actionTypes"

const initialState = {
  driverSelection: null,
  locationSelection: null,
  orderInfo: null,
}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DRIVER_SELECTION:
      return { ...state, driverSelection: action.payload }
    case UPDATE_LOCATION_SELECTION:
      return { ...state, locationSelection: action.payload }
    case UPDATE_ORDER_INFO:
      return { ...state, orderInfo: action.payload }
    default:
      return state
  }
}

export default checkoutReducer
