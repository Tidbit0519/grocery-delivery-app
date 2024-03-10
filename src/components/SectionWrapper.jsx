import { Box } from "@mui/material"

// Defining SectionWrapper as a Higher-Order Component
const SectionWrapper = (WrappedComponent) => {
  // Return a new component
  return function WrappedWithSection(props) {
    return (
      <Box sx={{ padding: 4 }}>
        <WrappedComponent {...props} />
      </Box>
    )
  }
}

export default SectionWrapper
