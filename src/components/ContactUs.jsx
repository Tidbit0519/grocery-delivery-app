import { useRef, useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material"
import SectionWrapper from "./SectionWrapper"
import { textVariant } from "../utils/motion"

const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    emailjs
      .send("service_jtbt1999", "template_atzyykc", form, "X3qgEA_Xj7oM703NV")
      .then(
        () => {
          setLoading(false)
          alert("Thank you. I will get back to you as soon as possible.")
          setForm({ name: "", email: "", message: "" })
        },
        (error) => {
          setLoading(false)
          console.log(error)
          alert("Sorry, something went wrong. Please try again later.")
        }
      )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        mb: 4,
      }}
      component={motion.div}
      variants={textVariant(0.2)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "flex-start",
          width: { xs: "100%", md: "50%" },
          pr: { xs: 0, md: 8 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#424141",
            mb: 4,
            fontWeight: "bold",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          CONTACT US
        </Typography>

        <Typography
          variant="body1"
          component={motion.div}
          sx={{ color: "#424141", lineHeight: 2 }}
          textAlign={{ xs: "center", md: "left" }}
        >
          Let us know how we can help you. Fill out the form below and we will
          get back to you as soon as possible.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          width: { xs: "100%", md: "40%" },
        }}
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Your Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Your Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            color="primary"
            sx={{
              width: "15rem",
              color: "common.white",
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                color="inherit"
              />
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default SectionWrapper(Contact, "contact")
