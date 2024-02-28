import Navbar from "./components/Navbar"

import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CheckoutPage from "./pages/CheckoutPage"
import DeliveryStatusPage from "./pages/DeliveryStatusPage"
import Copyright from "./components/Copyright"
import { Box } from "@mui/material"
import { Provider } from "react-redux"
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ width: "100vw" }}>
        <Navbar />
        <Copyright />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/checkout"
            element={<CheckoutPage />}
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
