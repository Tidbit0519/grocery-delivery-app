import Hero from "../components/Hero"
import AboutUs from "../components/AboutUs"
import ContactUs from "../components/ContactUs"
import { Box, Divider } from "@mui/material"

function HomePage() {
  return (
    <Box>
      <Hero />
      <AboutUs />
      <Divider variant="middle" />
      <ContactUs />
    </Box>
  )
}

export default HomePage
