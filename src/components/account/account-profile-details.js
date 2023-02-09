import { useState } from "react";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

const names = [
  "Parking",
  "Pool",
  "Bar",
  "Wi-Fi",
  "Kids pool",
  "24 hours room services",
  "Laundry services",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const AccountProfileDetails = (props) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChangeone = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      descryption: "",
      state: "",
      province: "",
      country: "",
      map: "",
      facility: [],
    },
    validationSchema: Yup.object({
      //hotelName: Yup.string().max(255).required("Hotel name is required"),
      //email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      //address: Yup.string().max(255).required("Address is required"),
      //contact: Yup.number().min(10).required("Contact number is required"),
      //vat: Yup.string().max(255).required("Contact is required"),
      //businessRegNumber: Yup.string().max(255).required("Business Registration Number is required"),
      //password: Yup.string().max(255).required("Password is required"),
      //policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: (values, actions) => {
      console.log({ values });

      // let formData = new FormData();
      //formData.append("hotelName", values)
      // let data = new FormData();
      // data.append("image", values.image);
      // data.append("name", values.hotelName);
      // data.append("address", values.address);
      // data.append("email", values.email);
      // data.append("password", values.password);
      // data.append("hotel_type", values.hotel_type);

      // signin(data);
    },
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Hotelier Profile" />
        <Divider />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Main Details</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Hotel Name"
                name="name"
                required
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="address"
                name="address"
                required
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Email Address" name="email" required variant="outlined" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="number"
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                required
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="state"
                name="state"
                required
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="map"
                name="map"
                required
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.map}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Hotel Facilities</Typography>
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
            <Grid item md={12} xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="Facilities">Facilities</InputLabel>
                <Select
                  labelId="Facilities"
                  id="Facilities"
                  multiple
                  name="facility"
                  //value={personName}
                  //onChange={handleChangeone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.facility}
                  input={<OutlinedInput id="select-multiple-chip" label="Facilities" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography variant="h6">Hotel Facilities</Typography>
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="Facilities">Facilities</InputLabel>
                <Select
                  labelId="Facilities"
                  id="Facilities"
                  multiple
                  name="facility"
                  //value={personName}
                  //onChange={handleChangeone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.facility}
                  input={<OutlinedInput id="select-multiple-chip" label="Facilities" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button type="submit" color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
