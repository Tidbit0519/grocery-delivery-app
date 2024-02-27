/* eslint-disable react/prop-types */
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

function ReviewOrderPage({ orderDetails }) {
  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Date and Driver" />
            <Typography variant="body2">{orderDetails.dateAndDriver}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Location" />
            <Typography variant="body2">{orderDetails.location}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Order Information" />
            <Typography variant="body2">{orderDetails.orderInfo}</Typography>
          </ListItem>
        </List>
      </Paper>
      <Typography variant="body1">
        Please review your order details. If everything looks correct, click &quot;Finish&quot; to submit your order.
      </Typography>
    </Box>
  );
}

export default ReviewOrderPage;
