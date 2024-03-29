/* eslint-disable react/no-unknown-property */
import SectionWrapper from "./SectionWrapper"
import { Box, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { textVariant } from "../utils/motion"

function AboutUs() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: "100%", md: "50%" },
          pr: { xs: 0, md: 8 },
          alignSelf: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          component={motion.div}
          variants={textVariant(0.2)}
          sx={{
            color: "#424141",
            mb: 4,
            fontWeight: "bold",
          }}
          textAlign={{ xs: "center", md: "left" }}
        >
          ABOUT US
        </Typography>

        <Typography
          variant="body1"
          component={motion.div}
          variants={textVariant(0.4)}
          sx={{ color: "#424141", lineHeight: 2, mb: 4 }}
          textAlign={{ xs: "center", md: "left" }}
        >
          HI Delivery brings neighbors together—connecting those without cars to
          willing drivers for easy grocery pickups from stores like Walmart,
          Sam&apos;s Club, Target, and Safeway. Our mission is to save North
          Shore residents time and strengthen community bonds.
        </Typography>
      </Box>

      <motion.div variants={textVariant(0.6)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <iframe
            width="400vw"
            height="360px"
            src="https://www.youtube.com/embed/ol9LfYhhdaU?si=sAGF1VdK6mhsAEfT"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Box>
      </motion.div>
    </Box>
  )
}

export default SectionWrapper(AboutUs)
