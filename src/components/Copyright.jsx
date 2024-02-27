import { Typography, Link } from "@mui/material"

function Copyright() {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        padding: "10px 0",
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
