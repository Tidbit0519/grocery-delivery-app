/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button, Grid, Typography, Box, Divider, List, ListItem, ListItemText } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { CardElement } from "@stripe/react-stripe-js"
import { v4 as uuidv4 } from "uuid"

import { motion } from "framer-motion"
import { boxVariants } from "../utils/motion"

const products = [
  {
    name: "Delivery Fee",
    price: "$5.67",
  },
  {
    name: "Service Fee",
    price: "$3.45",
  },
  {
    name: "Long Distance Fee",
    price: "$5.00",
  },
  {
    name: "Taxes",
    price: "$0.51",
  },
]

export default function Checkout() {
  const {
    firstName,
    lastName,
    phoneNumber,
    orderNumber,
    deliveryInstructions,
  } = useSelector((state) => state.orderInfo)

  const locationSelection = useSelector((state) => state.locationSelection)
  const pickupDate = useSelector((state) => state.pickupDate)
  const pickupTime = useSelector((state) => state.pickupTime)
  const deliveryAddress = useSelector((state) => state.deliveryAddress)

  const [trackingNumber, setTrackingNumber] = useState()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTrackingNumber(uuidv4())
    setTimeout(() => {
      setShowConfirmation(true)
      setTimeout(() => {
        navigate("/")
      }, 5000)
    }, 1000)
  }


  const [timer, setTimer] = useState(5)

  useEffect(() => {
    if (showConfirmation) {
      const interval = setInterval(() => {
        setTimer((prevCount) => prevCount - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [showConfirmation])

  if (showConfirmation) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "4px",
          width: "50%",
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "success.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 2,
          }}
          initial="hidden"
          animate="visible"
          component={motion.div}
          variants={boxVariants}
        >
          <Typography
            variant="h5"
            color="common.white"
            component="div"
          >
            <CheckIcon
              sx={{
                height: "auto",
                width: 40,
                transform: "translate(0, 10%)",
              }}
            />
          </Typography>
        </Box>
        <Typography
          variant="h6"
          textAlign="center"
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={boxVariants}
        >
          We have received your order!
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={boxVariants}
        >
          You will receive an email confirmation shortly. You will be redirected to the home page in {timer} seconds.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, color: "common.white"}}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </Button>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        textAlign="left"
        gutterBottom
      >
        Order Summary
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List disablePadding>
        {products.map((product) => (
          <ListItem
            key={product.name}
            sx={{ px: 0 }}
          >
            <ListItemText
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700 }}
          >
            $34.06
          </Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            <Typography
              variant="h6"
              textAlign="left"
              gutterBottom
            >
              Your Contact Information
            </Typography>
            <DeliveryInfoReviewItem value={firstName + " " + lastName} />
            <DeliveryInfoReviewItem value={phoneNumber} />
            <DeliveryInfoReviewItem value={deliveryAddress} />
            <DeliveryInfoReviewItem
              value={"Delivery Instruction: " + deliveryInstructions}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            <Typography
              variant="h6"
              textAlign="left"
              gutterBottom
            >
              Order Information
            </Typography>
            <OrderInfoReviewItem
              label="Order # "
              value={orderNumber}
            />
            <OrderInfoReviewItem
              label="Location: "
              value={locationSelection.structured_formatting.secondary_text}
            />
            <OrderInfoReviewItem
              label="Pick-Up Date: "
              value={pickupDate}
            />
            <OrderInfoReviewItem
              label="Pick-Up Time: "
              value={pickupTime}
            />
          </Box>
        </Grid>
      </Grid>

      <form
        onSubmit={handleSubmit}
        style={{ width: "100%" }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          Payment Details
        </Typography>
        <Box
          sx={{ border: 1, borderColor: "divider", p: 2, borderRadius: "4px" }}
        >
          <CardElement />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, display: "block", width: "100%", color: "common.white" }}
        >
          Submit Payment
        </Button>
      </form>
    </Box>
  )
}

function DeliveryInfoReviewItem({ value }) {
  return (
    <ListItem sx={{ py: 1, px: 0 }}>
      <ListItemText primary={value} />
    </ListItem>
  )
}

function OrderInfoReviewItem({ label, value }) {
  return (
    <ListItem sx={{ py: 1, px: 0 }}>
      <ListItemText primary={label} />
      <Typography
        variant="body1"
        sx={{ fontWeight: 700 }}
      >
        {value}
      </Typography>
    </ListItem>
  )
}
