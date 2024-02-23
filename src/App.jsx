import Navbar from "./components/Navbar"

import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import OrderPage from "./pages/OrderPage"

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/order"
          element={<OrderPage />}
        />
      </Routes>
    </div>
  )
}

export default App
