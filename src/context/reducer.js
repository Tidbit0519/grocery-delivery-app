import {
  UPDATE_STORE_SELECTION,
  UPDATE_DRIVER_SELECTION,
  UPDATE_LOCATION_SELECTION,
  UPDATE_ORDER_INFO,
  UPDATE_PICKUP_DATE,
  UPDATE_PICKUP_TIME,
  UPDATE_DELIVERY_ADDRESS
} from "./actionTypes"

const initialState = {
  storeSelection: "",
  driverSelection: null,
  locationSelection: "",
  orderInfo: {},
  pickupDate: "",
  pickupTime: "",
  deliveryAddress: ""
}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STORE_SELECTION:
      return { ...state, storeSelection: action.payload }
    case UPDATE_DRIVER_SELECTION:
      return { ...state, driverSelection: action.payload }
    case UPDATE_LOCATION_SELECTION:
      return { ...state, locationSelection: action.payload }
    case UPDATE_ORDER_INFO:
      return { ...state, orderInfo: action.payload }
    case UPDATE_PICKUP_DATE:
      console.log(action.payload)
      return { ...state, pickupDate: action.payload }
    case UPDATE_PICKUP_TIME:
      console.log(action.payload)
      return { ...state, pickupTime: action.payload }
    case UPDATE_DELIVERY_ADDRESS:
      return { ...state, deliveryAddress: action.payload }
    default:
      return state
  }
}

export default Reducer
