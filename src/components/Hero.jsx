import { Link } from "react-router-dom"

import { Box, Typography, Button, Container } from "@mui/material"
import BeachAccessIcon from "@mui/icons-material/BeachAccess"
// import HeroBg from "../assets/herobg.jpeg"

const Hero = () => {
  return (
    <Box
      // sx={{
      //   backgroundImage: `url(${HeroBg})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   height: "95vh",
      //   width: "100vw",
      //   color: "#fff",
      // }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Freshness Delivered to Your Doorstep in Paradise
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Get your groceries delivered fast & fresh
        </Typography>
        <Link
          to="/checkout"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<BeachAccessIcon />}
            sx={{
              width: "15rem",
            }}
          >
            Start Your Order
          </Button>
        </Link>
        <Link
          to="/status"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              mt: 2,
              width: "15rem",
            }}
          >
            Check Delivery Status
          </Button>
        </Link>
      </Container>
    </Box>
  )
}

export default Hero
