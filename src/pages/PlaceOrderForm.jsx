/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { Box, TextField } from "@mui/material"

function PlaceOrderForm({
  triggerSubmit,
  onSubmissionHandled,
  onFormComplete,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    orderNumber: "",
  })

  useEffect(() => {
    if (triggerSubmit) {
      // Perform form submission logic here
      console.log("Form is being submitted")

      // Call this after form submission logic is executed
      onSubmissionHandled()
    }
  }, [triggerSubmit, onSubmissionHandled])

  useEffect(() => {
    onFormComplete(Object.values(formData).every((val) => val !== ""))
  }, [formData, onFormComplete])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "300px" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          required
          id="phone"
          name="phone"
          label="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          id="orderNumber"
          name="orderNumber"
          label="Order Number (if any)"
          value={formData.orderNumber}
          onChange={handleChange}
        />
      </div>
    </Box>
  )
}

export default PlaceOrderForm
