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
      Reception Halls
      </Typography>

      <Box sx={{ m: 1 }}>
        <Button color="primary" variant="contained" href="/receptionHall/addNewReceptionHall">
          Add New Reception Hall
        </Button>
      </Box>
    </Box>
  </Box>
);
