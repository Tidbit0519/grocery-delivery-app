/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateLocationSelection } from "../context/actions"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { debounce } from "@mui/material/utils"
import { Skeleton } from "@mui/material"

// Assuming GOOGLE_MAPS_API_KEY is correctly defined

const autocompleteService = { current: null }

export default function GoogleMaps({ handleStepComplete }) {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const mapRef = useRef(null)

  const dispatch = useDispatch()
  const storeSelection = useSelector((state) => state.storeSelection)
  const locationSelection = useSelector((state) => state.locationSelection)

  const handleUpdateLocationSelection = (store) => {
    dispatch(updateLocationSelection(store))
    handleStepComplete(true)
  }

  
  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }

    if (autocompleteService.current) {
      setLoading(true)
      const fetch = debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback)
      }, 200)

      fetch({ input: storeSelection.name }, (results) => {
        setLoading(false)
        setLocations(results || [])
      })

    }
  }, [storeSelection.name])

  const handleGoogleMapMarker = (placeId) => {
    const service = new window.google.maps.places.PlacesService(mapRef.current)
    service.getDetails({ placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        mapRef.current
      ) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: place.geometry.location,
          zoom: 15,
        })
        new window.google.maps.Marker({
          position: place.geometry.location,
          map: map,
        })
      }
    })
  }

  return (
    <Container>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Skeleton
            variant="text"
            width={400}
            height={20}
          />
          <Skeleton
            variant="text"
            width={400}
            height={20}
          />
          <Skeleton
            variant="text"
            width={400}
            height={20}
          />
        </Box>
      ) : (
        <Grid
            container
            justifyContent="center"
          spacing={2}
        >
          {locations.map((location, index) => (
            <Grid
              item
              key={index}
              xs={6}
              sm={4}
              md={4}
            >
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: 110,
                  border:
                    locationSelection.place_id === location.place_id
                      ? "2px solid blue"
                      : "none",
                  "&:hover": {
                    cursor: "pointer",
                    opacity: 0.9,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => {
                    handleGoogleMapMarker(location.place_id)
                    handleUpdateLocationSelection(location)
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <LocationOnIcon sx={{ mr: 1 }} />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {location.structured_formatting.secondary_text}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box
        ref={mapRef}
        sx={{
          height: 300,
          width: "100%",
          marginTop: 2,
          display: "block",
        }}
      />
    </Container>
  )
}
