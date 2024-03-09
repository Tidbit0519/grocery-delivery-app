import { useDispatch } from 'react-redux';
import { updatePickupDate, updatePickupTime } from '../context/actions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function DateTimePicker() {
  const dispatch = useDispatch();

  const handleUpdatePickupDate = (date) => {
    dispatch(updatePickupDate(date));
  }

  const handleUpdatePickupTime = (time) => {
    dispatch(updatePickupTime(time));
  }

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 2);
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0].split('-').join('-');
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <TextField
        label="* Pick Up Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: formatDate(today),
          max: formatDate(maxDate), // 2 days from today
        }}
        fullWidth
        margin="normal"
        onChange={(e) => handleUpdatePickupDate(e.target.value || formatDate(today))}
      />
      <TextField
        label="* Pick Up Time"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
        onChange={(e) => handleUpdatePickupTime(e.target.value)}
      />
    </Box>
  )
}
