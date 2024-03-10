import { Typography, Link } from "@mui/material"

function Copyright() {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      sx={{
        position: "static",
        padding: "10px",
      }}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="/"
      >
        HI Delivery
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default Copyright
