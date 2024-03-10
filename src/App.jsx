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
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const stripePromise = loadStripe(
  "pk_test_51OjHFYEh6k3BCHvRLjRwHopAlBpu6Aw0Sr5c1Id2b7VlTWmkmdOmWG9n65C0QZxU46og6GmmDtghTBJ5B29CJuXj00lhgJy5e4"
)

function App() {
  // Create a theme instance.
  const theme = createTheme({
    palette: {
      primary: {
        main: "#73bae4",
      },
      secondary: {
        main: "#424141",
      },
    },
  })

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Elements stripe={stripePromise}>
          <Navbar />
          <Box sx={{ width: "100vw" }}>
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
          <Copyright />
        </Elements>
      </ThemeProvider>
    </Provider>
  )
}

export default App
