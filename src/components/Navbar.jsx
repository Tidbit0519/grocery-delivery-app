import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SearchIcon from '@mui/icons-material/Search';
import Logo from "../assets/logo.png"

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const actions = [
    { icon: <ShoppingCartIcon />, name: "Place Order", to: "/order" },
    { icon: <SearchIcon />, name: "Delivery Status", to: "/status"}
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (path) => {
    navigate(path)
    handleClose()
  }

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        sx={{ boxShadow: 'none' }}
      >
        <Toolbar>
          <Box
            component="img"
            sx={{
              maxHeight: 50,
              maxWidth: 50,
              py: 1,
            }}
            alt="logo"
            src={Logo}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: { xs: 1, sm: 2 }, mr: 0.5, color: "#73bae4" }}
              onClick={() => handleNavigate("/")}
            >
              HI
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "#424141" }}
              onClick={() => handleNavigate("/")}
            >
              DELIVERY
            </Typography>
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ ml: "auto" }}
          >
            <MenuIcon sx={{ color: "#73bae4" }} />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={open}
            onClose={handleClose}
            sx={{
              display: "block",
            }}
          >
            {actions.map((action) => (
              <MenuItem
                key={action.name}
                onClick={handleClose}
                sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 1 }}
              >
                <Link
                  to={action.to}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {action.icon}
                  <Typography
                    textAlign="center"
                    sx={{ ml: 1 }}
                    color="#424141"
                  >
                    {action.name}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
