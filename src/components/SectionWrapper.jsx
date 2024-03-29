import { motion } from "framer-motion"

import { staggerContainer } from "../utils/motion"
import { Box } from "@mui/material"

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: { xs: 4, md: 36 },
        }}
      >
        <motion.section
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <span
            className="hash-span"
            id={idName}
          >
            &nbsp;
          </span>

          <Component />
        </motion.section>
      </Box>
    )
  }

export default StarWrapper
