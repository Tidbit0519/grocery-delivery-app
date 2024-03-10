/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { updateOrderInfo } from "../context/actions"
import {
  TextField,
  Button,
  Divider,
  Typography,
  Box,
  Grid,
} from "@mui/material"
import DateTimePicker from "./DateTimePicker"
import DeliveryAddress from "./DeliveryAddress"

function OrderForm({ handleStepComplete, handleNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(updateOrderInfo(data))
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
      handleStepComplete(true)
      handleNext()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 4 }}>
        <Divider variant="middle">
          <Typography variant="overline">Contact Information</Typography>
        </Divider>
        <Grid
          container
          sx={{ marginTop: 2 }}
          columnSpacing={2}
          rowSpacing={0}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="* First Name"
              variant="outlined"
              fullWidth
              {...register("firstName", { required: true })}
              error={!!errors.firstName}
              helperText={errors.firstName ? "First name is required" : ""}
              margin="normal"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              {...register("lastName", { required: true })}
              error={!!errors.lastName}
              helperText={errors.lastName ? "Last name is required" : ""}
              margin="normal"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="* Phone Number"
              variant="outlined"
              fullWidth
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Invalid phone number",
                },
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
              margin="normal"
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Divider variant="middle">
          <Typography variant="overline">Pick Up Information</Typography>
        </Divider>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <TextField
            label="* Curbside Number"
            variant="outlined"
            fullWidth
            {...register("curbsideNumber", {
              required: "Curbside number is required",
            })}
            error={!!errors.curbsideNumber}
            helperText={
              errors.curbsideNumber ? errors.curbsideNumber.message : ""
            }
            margin="normal"
          />
          <TextField
            label="Order Number (if any)"
            variant="outlined"
            fullWidth
            {...register("orderNumber", {
              required: "Order number is required",
            })}
            error={!!errors.orderNumber}
            helperText={errors.orderNumber ? errors.orderNumber.message : ""}
            margin="normal"
          />
        </Box>
        <DateTimePicker />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Divider variant="middle">
          <Typography variant="overline">Delivery Information</Typography>
        </Divider>
        <DeliveryAddress />
        <TextField
          label="Delivery Instructions"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("deliveryInstructions")}
          margin="normal"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", position: "relative" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ position: "absolute", top: 10, color: "common.white" }}
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default OrderForm
