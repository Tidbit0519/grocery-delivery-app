import { useState, useEffect, useMemo, useRef } from "react"
import { useDispatch } from "react-redux"
import { updateDeliveryAddress } from "../context/actions"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import parse from "autosuggest-highlight/parse"
import { debounce } from "@mui/material/utils"

const autocompleteService = { current: null }

export default function DeliveryAddress() {
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState([])
  const mapRef = useRef(null)

  const dispatch = useDispatch()

  const handleUpdateDeliveryAddress = (address) => {
    dispatch(updateDeliveryAddress(address))
  }

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback)
      }, 200),
    []
  )

  useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === "") {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

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
    <>
      <Autocomplete
        id="google-map-demo"
        sx={{ width: 300 }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options)
          setValue(newValue)
          handleUpdateDeliveryAddress(newValue.description)
          handleGoogleMapMarker(newValue.place_id)
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="* Delivery Address"
            fullWidth
            margin = "normal"
          />
        )}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || []
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          )

          return (
            <li {...props}>
              <Grid
                container
                alignItems="center"
              >
                <Grid
                  item
                  sx={{ display: "flex", width: 44 }}
                >
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          )
        }}
      />
      <Box
        ref={mapRef}
        sx={{
          height: value ? 300 : 0,
          width: "100%",
          marginTop: 2,
          display: value ? "block" : "none",
        }}
      />
    </>
  )
}
