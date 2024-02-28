import {
  UPDATE_DRIVER_SELECTION,
  UPDATE_LOCATION_SELECTION,
  UPDATE_ORDER_INFO,
} from "./actionTypes"

export const updateDriverSelection = (driver) => ({
  type: UPDATE_DRIVER_SELECTION,
  payload: driver,
})

export const updateLocationSelection = (location) => ({
  type: UPDATE_LOCATION_SELECTION,
  payload: location,
})

export const updateOrderInfo = (orderInfo) => ({
  type: UPDATE_ORDER_INFO,
  payload: orderInfo,
})
