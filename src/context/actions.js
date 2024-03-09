import {
  UPDATE_STORE_SELECTION,
  UPDATE_DRIVER_SELECTION,
  UPDATE_LOCATION_SELECTION,
  UPDATE_ORDER_INFO,
  UPDATE_PICKUP_DATE,
  UPDATE_PICKUP_TIME,
  UPDATE_DELIVERY_ADDRESS,
} from "./actionTypes"

export const updateStoreSelection = (store) => ({
  type: UPDATE_STORE_SELECTION,
  payload: store,
})

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

export const updatePickupDate = (date) => ({
  type: UPDATE_PICKUP_DATE,
  payload: date,
})

export const updatePickupTime = (time) => ({
  type: UPDATE_PICKUP_TIME,
  payload: time,
})

export const updateDeliveryAddress = (address) => ({
  type: UPDATE_DELIVERY_ADDRESS,
  payload: address,
})