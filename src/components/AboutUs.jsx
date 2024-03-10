import SectionWrapper from "./SectionWrapper"
import { Typography } from "@mui/material"

function AboutUs() {
  return (
    <>
      <Typography
        variant="h5"
        component="div"
        sx={{ color: "#424141" }}
        textAlign={{ xs: "center", md: "left" }}
      >
        ABOUT US
      </Typography>
    </>
  )
}

export default SectionWrapper(AboutUs)
