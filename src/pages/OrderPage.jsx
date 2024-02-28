import { useState } from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepButton from "@mui/material/StepButton"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Container } from "@mui/material"
import PickStore from "../components/PickStore"
import GoogleMaps from "./MapsPage"
import PlaceOrderForm from "./PlaceOrderForm"
import { motion } from "framer-motion"
import { fadeIn } from "../utils/motion"

const steps = ["Pick a store", "Locate on map", "Fill in order details"]

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PickStore />
    case 1:
      return <GoogleMaps />
    case 2:
      return <PlaceOrderForm />

    default:
      throw new Error("Unknown step")
  }
}

export default function OrderPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <Box
      sx={{ width: "100%", py: 8 }}
      component={motion.div}
      initial="hidden"
      animate="show"
      variants={fadeIn("up", "tween", 0.2, 1)}
    >
      <Stepper
        Linear
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={completed[index]}
          >
            <StepButton
              color="inherit"
              onClick={handleStep(index)}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Container sx={{ width: "50%", py: 8 }}>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ textAlign: "center" }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}
