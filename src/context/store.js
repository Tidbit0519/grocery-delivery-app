import { createStore,  } from "redux"
import checkoutReducer from "./reducer"

const store = createStore(checkoutReducer)

export default store
