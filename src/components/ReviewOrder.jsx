import { useSelector } from "react-redux"
import { Card, CardContent, Grid, Typography } from "@mui/material"

export default function ReviewOrder() {
  const {
    firstName,
    lastName,
    phoneNumber,
    curbsideNumber,
    orderNumber,
    deliveryInstructions,
  } = useSelector((state) => state.orderInfo)

  const locationSelection = useSelector((state) => state.locationSelection)

  const pickupDate = useSelector((state) => state.pickupDate)
  const pickupTime = useSelector((state) => state.pickupTime)

  const deliveryAddress = useSelector((state) => state.deliveryAddress)

  return (
    <Card
      raised
      sx={{ maxWidth: 345, m: 2 }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          Contact Information
        </Typography>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">First Name: {firstName}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">Last Name: {lastName}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">Phone Number: {phoneNumber}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">Location Information: {locationSelection.description} </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">
              Curbside Number: {curbsideNumber}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">Order Number: {orderNumber}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">Pickup Date: {pickupDate}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">Pickup Time: {pickupTime}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">
              Delivery Address: {deliveryAddress}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="body1">
              Delivery Instructions: {deliveryInstructions}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
