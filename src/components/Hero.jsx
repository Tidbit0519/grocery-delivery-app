import { Link } from "react-router-dom"

import { Box, Typography, Button, Grid } from "@mui/material"
import { motion } from "framer-motion"
import { textVariant } from "../utils/motion"
import HeroBg from "../assets/herobg.webp"

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundImage: `url(${HeroBg})`,
        backgroundSize: "contain",
        backgroundPosition: { md: "100% 50%" },
        backgroundRepeat: "no-repeat",
        backgroundColor: "#9cc398",
        height: "60vh",
        width: "100vw",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={5}
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            pl: { xs: 4, md: 16 },
          }}
          component={motion.div}
          initial="hidden"
          animate="show"
          variants={textVariant(0.2)}
        >
          <Typography
            variant="h3"
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
            to="/order"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "15rem",
              }}
            >
              Deliver Now
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Hero
