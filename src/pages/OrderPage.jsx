import { Typography, Container } from "@mui/material"

function OrderPage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
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
        This is the Order Page
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
    </Container>
  )
}

export default OrderPage
