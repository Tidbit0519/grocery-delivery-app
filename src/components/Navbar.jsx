import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const actions = [
    { icon: <HomeIcon />, name: "Home", to: "/", action: () => handleNavigate("/") },
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
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: { xs: 2, sm: 4 } }}
          >
            HI Delivery
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
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
              display: { xs: "block", md: "none" },
            }}
          >
            {actions.map((action) => (
              <MenuItem
                key={action.name}
                onClick={handleClose}
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
