import { Box, Button, Typography } from "@mui/material";

export const OfferListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Offers
      </Typography>

      <Box sx={{ m: 1 }}>
        <Button color="primary" variant="contained" href="/offers/addNewOffer">
          Add New Offer
        </Button>
      </Box>
    </Box>
  </Box>
);
