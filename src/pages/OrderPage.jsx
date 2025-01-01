import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import PickStore from "../components/PickStore";
import GoogleMap from "../components/GoogleMap";
import OrderForm from "../components/OrderForm";
import Checkout from "../components/Checkout";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const steps = [
	"Pick a store",
	"Locate on map",
	"Fill in order details",
	"Checkout",
];

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function loadScript(src, position, id) {
	if (!position) {
		return;
	}

	const script = document.createElement("script");
	script.setAttribute("async", "");
	script.setAttribute("id", id);
	script.src = src;
	position.appendChild(script);
}

if (typeof window !== "undefined") {
	if (!document.querySelector("#google-maps")) {
		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
			document.querySelector("head"),
			"google-maps"
		);
	}
}

export default function OrderPage() {
	const [activeStep, setActiveStep] = useState(0);
	const [stepCompleted, setStepCompleted] = useState(steps.map(() => false));

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<PickStore
						handleStepComplete={(complete) => handleStepComplete(0, complete)}
					/>
				);
			case 1:
				return (
					<GoogleMap
						handleStepComplete={(complete) => handleStepComplete(1, complete)}
					/>
				);
			case 2:
				return (
					<OrderForm
						handleStepComplete={(complete) => handleStepComplete(2, complete)}
						handleNext={handleNext}
					/>
				);
			case 3:
				return <Checkout />;

			default:
				throw new Error("Unknown step");
		}
	}

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return stepCompleted.filter((val) => val).length; // Count how many steps are true
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? steps.findIndex((step, i) => !(i in stepCompleted))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	const handleStepComplete = (stepIndex, completed) => {
		const newStepCompleted = [...stepCompleted];
		newStepCompleted[stepIndex] = completed;
		setStepCompleted(newStepCompleted);
	};

	const handleReset = () => {
		setActiveStep(0);
		setStepCompleted({});
	};

	return (
		<Box
			sx={{ width: "100%", pt: 8 }}
			component={motion.div}
			initial="hidden"
			animate="show"
			variants={fadeIn("up", "tween", 0.2, 1)}
		>
			<Stepper
				linear="true"
				activeStep={activeStep}
				alternativeLabel
			>
				{steps.map((label, index) => (
					<Step
						key={label}
						completed={stepCompleted[index]}
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
			<Container
				sx={{
					width: {
						xs: "100%",
						sm: "60%",
					},
					py: 8,
				}}
			>
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
								variant="contained"
								onClick={handleNext}
								color="primary"
								sx={{
									mr: 1,
									display:
										activeStep === 2 || activeStep === steps.length - 1
											? "none"
											: "block",
									color: "common.white",
								}}
								disabled={!stepCompleted[activeStep]}
							>
								Next
							</Button>
						</Box>
					</>
				)}
			</Container>
		</Box>
	);
}
