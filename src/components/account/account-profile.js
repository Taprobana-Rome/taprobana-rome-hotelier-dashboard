import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina",
  timezone: "GTM-7",
};

export const AccountProfile = (props) => {


  return (
    <>
      <Card {...props}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Typography
              textAlign={"center"}
              fontWeight={"bold"}
              color="textPrimary"
              gutterBottom
              variant="h7"
            >
              {user.name}
            </Typography>
            {/* <Typography color="textSecondary" variant="body2" textAlign={"center"}>
          {`${user.city} ${user.country}`}
        </Typography> */}
            {/* <Typography color="textSecondary" variant="body2">
          {user.timezone}
        </Typography> */}
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth variant="text">
            Upload
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
