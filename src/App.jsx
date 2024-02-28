import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import OrderPage from "./pages/OrderPage"
// import CheckoutPage from "./pages/CheckoutPage"
import DeliveryStatusPage from "./pages/DeliveryStatusPage"
import Copyright from "./components/Copyright"
import { Box } from "@mui/material"
import { Provider } from "react-redux"
import store from "../src/context/store"

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Box sx={{ width: "100vw" }}>
        <Copyright />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/order"
            element={<OrderPage />}
          />
          <Route
            path="/status"
            element={<DeliveryStatusPage />}
          />
        </Routes>
      </Box>
    </Provider>
  )
}

export default App
