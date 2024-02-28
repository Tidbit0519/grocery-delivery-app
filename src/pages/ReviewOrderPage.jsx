/* eslint-disable react/prop-types */
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from "react-redux"

function ReviewOrderPage() {
  const driverSelection = useSelector((state) => state.driverSelection)
  console.log(driverSelection)

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <Paper
        variant="outlined"
        sx={{ p: 2, mb: 2 }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          Order Summary
        </Typography>
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Date" />
            <Typography variant="body2">{}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Driver" />
            <Typography variant="body2">{driverSelection.name}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Vehicle" />
            <Typography variant="body2">
              {driverSelection.vehicle} | {driverSelection.licensePlate}
            </Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Phone No." />
            <Typography variant="body2">{driverSelection.phone}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Location" />
            <Typography variant="body2">{}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Order Information" />
            <Typography variant="body2">{}</Typography>
          </ListItem>
        </List>
      </Paper>
      <Typography variant="body1">
        Please review your order details. If everything looks correct, click
        &quot;Finish&quot; to submit your order.
      </Typography>
    </Box>
  )
}

export default ReviewOrderPage;
