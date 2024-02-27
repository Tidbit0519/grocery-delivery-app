/* eslint-disable react/prop-types */
import { useState } from "react"
import { Typography, Container } from "@mui/material"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import dayjs from "dayjs"

import drivers from "../constants/driver"

let today = new Date(Date.now())
today = dayjs()

function DriversPage({ onDriverSelect }) {
  const [value, setValue] = useState(today)
  const [selectedDay, setSelectedDay] = useState(today.day().toString())
  const [selectedDriverId, setSelectedDriverId] = useState(null)

  const handleSelectDriver = (id) => {
    setSelectedDriverId(id)
    onDriverSelect(id) // Notify the parent component about the selection
  }

  return (
    <>
      <Container
        sx={{
          mb: 4,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="MM/DD/YYYY"
              value={value}
              onChange={(newValue) => {
                onDriverSelect(null) // Reset the driver selection
                setValue(newValue)
                setSelectedDay(newValue.day().toString())
              }}
              sx={{ width: "280px"}}
              disablePast
            />
          </DemoContainer>
        </LocalizationProvider>
      </Container>

      <Container sx={{ width: { xs: "80%", sm: "50%" } }}>
        {drivers
          .filter((driver) => driver.availability === selectedDay)
          .map((driver) => (
            <DriverInfoCard
              key={driver.id}
              name={driver.name}
              phone={driver.phone}
              vehicle={driver.vehicle}
              licensePlate={driver.licensePlate}
              selected={selectedDriverId === driver.id}
              onClick={() => handleSelectDriver(driver.id)}
            />
          ))}
      </Container>
    </>
  )
}

function DriverInfoCard({
  name,
  phone,
  vehicle,
  licensePlate,
  selected,
  onClick,
}) {
  return (
    <Card
      sx={{
        my: 2,
        bgcolor: selected ? "primary.main" : "background.paper",
        color: selected ? "primary.contrastText" : "text.primary",
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>{phone}</Typography>
          <Typography variant="body2">
            {vehicle}
            <br />
            {licensePlate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DriversPage
