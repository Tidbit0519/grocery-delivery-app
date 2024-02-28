import { useState } from "react"
import { Container, Grid, Card, CardMedia, CardActionArea } from "@mui/material"

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

export default function PickStore() {
  const [selectedStore, setSelectedStore] = useState(null)

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
                  selectedStore === store.name ? "2px solid blue" : "none", // Conditional border styling
                "&:hover": {
                  cursor: "pointer",
                  opacity: 0.9,
                },
              }}
            >
              <CardActionArea onClick={() => setSelectedStore(store.name)}>
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
