/* eslint-disable react/prop-types */
import { Container, Grid, Card, CardMedia, CardActionArea } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateStoreSelection } from "../context/actions"

import Walmart from "../assets/walmart.png"
import Target from "../assets/target.png"
import SafeWay from "../assets/safeway.png"
import SamsClub from "../assets/sams-club.png"

const stores = [
  {
    name: "Walmart",
    image: Walmart,
  },
  {
    name: "Target",
    image: Target,
  },
  {
    name: "SafeWay",
    image: SafeWay,
  },
  {
    name: "Sam's Club",
    image: SamsClub,
  },
]

export default function PickStore({ handleStepComplete }) {
  const dispatch = useDispatch()
  const storeSelection = useSelector((state) => state.storeSelection)

  const handleUpdateStoreSelection = (store) => {
    dispatch(updateStoreSelection(store))
    handleStepComplete(true) // Notify the parent component about the selection
  }

  return (
    <Container>
      <Grid
        container
        spacing={2}
      >
        {stores.map((store) => (
          <Grid
            item
            xs={6}
            key={store.name}
          >
            <Card
              sx={{
                border:
                  storeSelection.name === store.name ? "2px solid blue" : "none", // Conditional border styling
                "&:hover": {
                  cursor: "pointer",
                  opacity: 0.9,
                },
              }}
            >
              <CardActionArea
                onClick={() => handleUpdateStoreSelection(store)}
              >
                <CardMedia
                  component="img"
                  image={store.image}
                  alt={store.name}
                  sx={{
                    height: 200,
                    width: 200,
                    objectFit: "contain",
                    margin: "auto",
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
