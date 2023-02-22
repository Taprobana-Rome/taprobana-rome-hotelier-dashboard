import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";


export const RoomListToolbar = (props) => {
  const hotelType = localStorage.getItem("hotelType");

  let myform;
if (hotelType === "Hotel" || "Resort") {
  myform = (
    <Button color="primary" variant="contained" href="/rooms/addNewRoomHotel">
      Add New Room
    </Button>
  );
}
if (hotelType === "Villa") {
  myform = (
    <Button color="primary" variant="contained" href="/rooms/addNewRoomVilla">
      Add New Villa
    </Button>
  );
}
if (hotelType === "Apartment") {
  myform = (
    <Button color="primary" variant="contained" href="/rooms/addNewRoomApartment">
      Add New Apartment
    </Button>
  );
}
if (hotelType === "Glamping") {
  myform = (
    <Button color="primary" variant="contained" href="/rooms/addNewRoomGlamping">
      Add New Glamping Room
    </Button>
  );
}
if (hotelType === "Luxury Hostels") {
  myform = (
    <Button color="primary" variant="contained" href="/rooms/addNewRoomLuxuryhostels">
      Add New Hostels
    </Button>
  );
}
  return (
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
          {hotelType} Rooms
        </Typography>

        <Box sx={{ m: 1 }}>{myform}</Box>
      </Box>
    </Box>
  );
};
