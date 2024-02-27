/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useMemo } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import parse from "autosuggest-highlight/parse"
import { debounce } from "@mui/material/utils"

const GOOGLE_MAPS_API_KEY = "AIzaSyDaUKJnGQ2UrJ71_F0fdhfNUP-XqBp5Pq8"

function loadScript(src, position, id) {
  if (!position) {
    return
  }

  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.setAttribute("id", id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

export default function GoogleMaps({ onMapSelect }) {
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState([])
  const loaded = useRef(false)
  const mapRef = useRef(null)

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      )
    }

    loaded.current = true
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
          onMapSelect(newValue)

          if (!newValue) {
            return
          }

          // Use the Google Maps Places library to get details of the selected place
          const service = new window.google.maps.places.PlacesService(
            mapRef.current
          )
          service.getDetails(
            { placeId: newValue.place_id },
            (place, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const map = new window.google.maps.Map(mapRef.current, {
                  center: place.geometry.location,
                  zoom: 15,
                })
                new window.google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                })
              }
            }
          )
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add a location"
            fullWidth
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
          height: 300,
          width: "100%",
          my: 2,
          display: mapRef.current ? "block" : "none",
        }}
      />
    </>
  )
}
