import Navbar from "./components/Navbar"

import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CheckoutPage from "./pages/CheckoutPage"
import DeliveryStatusPage from "./pages/DeliveryStatusPage"
import Copyright from "./components/Copyright"

function App() {
  return (
    <div>
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
    </div>
  )
}

export default App
