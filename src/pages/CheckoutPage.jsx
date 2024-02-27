import { useState } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import DriversPage from "./DriversPage"
import GoogleMaps from "./MapsPage"
import PlaceOrderForm from "./PlaceOrderForm"
import ReviewOrderPage from "./ReviewOrderPage"

const steps = [
  "Select a date and a driver",
  "Select a location",
  "Place order information",
  "Review your order",
]

const orderDetails = {
  dateAndDriver: "June 15, 2024 - John Doe",
  location: "123 Main St, Anytown, AN",
  orderInfo: "Order #12345",
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [stepCompleted, setStepCompleted] = useState(steps.map(() => false))
  const [triggerSubmit, setTriggerSubmit] = useState(false)

  const handleStepActionComplete = (stepIndex, completed) => {
    const newStepCompleted = [...stepCompleted]
    newStepCompleted[stepIndex] = completed
    setStepCompleted(newStepCompleted)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <DriversPage
            onDriverSelect={(selected) =>
              handleStepActionComplete(0, selected !== null)
            }
          />
        )
      case 1:
        return (
          <GoogleMaps
            onMapSelect={(selected) =>
              handleStepActionComplete(1, selected !== null)
            }
          />
        )
      case 2:
        return (
          <PlaceOrderForm
            triggerSubmit={triggerSubmit}
            onSubmissionHandled={() => setTriggerSubmit(false)}
            onFormComplete={(completed) =>
              handleStepActionComplete(2, completed)
            }
          />
        )
      case 3:
        return <ReviewOrderPage orderDetails={orderDetails} />

      default:
        throw new Error("Unknown step")
    }
  }

  const handleNext = () => {
    // Check if it's the PlaceOrderForm step
    if (activeStep === 2) {
      // Trigger form submission
      setTriggerSubmit(true)
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else {
      // Regular next step logic
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ width: "100vw" }}>
      <Paper
        variant="elevation"
        sx={{ my: { xs: 0, sm: 6 }, mx: { xs: 0, sm: 24 }, py: 2 }}
      >
        <Typography
          variant="h4"
          align="center"
        >
          Place Order
        </Typography>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ pt: 4, px: 4 }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1.25rem" }}
                >
                  {label}
                </Typography>
              </StepLabel>
              <StepContent>
                {getStepContent(index)}
                <Box sx={{ mb: 2, display: "flex" }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={
                      index !== steps.length - 1 && !stepCompleted[activeStep]
                    } // Check the step's completion status
                  >
                    {index === 2
                      ? "Submit"
                      : index === steps.length - 1
                      ? "Finish"
                      : "Continue"}
                  </Button>
                  <Button
                    onClick={handleBack}
                    sx={{
                      mt: 1,
                      mr: 1,
                      display: index === 0 ? "none" : "block",
                    }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper
            square
            elevation={0}
            sx={{ p: 3 }}
          >
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button
              onClick={handleReset}
              sx={{ mt: 1, mr: 1 }}
            >
              Reset
            </Button>
          </Paper>
        )}
      </Paper>
    </Box>
  )
}
