import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import OrderPage from "./pages/OrderPage"
import { SpeedDial, SpeedDialAction } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

function App() {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  const actions = [
    { icon: <HomeIcon />, name: "Home", action: () => handleNavigation("/") },
    {
      icon: <ShoppingCartIcon />,
      name: "Order",
      action: () => handleNavigation("/order"),
    },
  ]

  return (
    <div>
      <SpeedDial
        ariaLabel="Navigation Speed Dial"
        direction="down"
        sx={{ position: "absolute", top: 16, right: 16 }}
        icon={<MenuIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
          />
        ))}
      </SpeedDial>
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
