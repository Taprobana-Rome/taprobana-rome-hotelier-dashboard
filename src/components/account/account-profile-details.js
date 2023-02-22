import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import axios from "axios";





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

  const hotelid = localStorage.getItem("id");

  const [oldData, setoldData] = useState([]);
  const [onlyHigh, setonlyHigh] = useState([]);
  const [onlyFaci, setonlyFaci] = useState([]);

  console.log("olddata", onlyHigh);

  const getUpdateData = async () => {
    const updateData = await axios.get(`http://localhost:5000/hotelier/${hotelid}`);
    console.log({ updateData });
    setoldData(updateData.data.hotel);
    setonlyHigh(updateData.data.hotel.highlights);
    setonlyFaci(updateData.data.hotel.facilities);
  };

  useEffect(() => {
    getUpdateData();
  }, []);

  const updateHotel = async (data) => {
    const newData = await axios.put(`http://localhost:5000/hotelier/updatehotel/${hotelid}`, data).then((res)=>{
      console.log(newData);
      toast.success("Update Successfuly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    
  };

  //console.log("array?", oldData.reviews[0]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: oldData.name,
      email: oldData.email,
      address: oldData.address,
      phone: oldData.phone,
      description: oldData.description,
      state: oldData.state,
      province: oldData.province,
      country: oldData.country,
      mapss: oldData.mapss,
      facilities: onlyFaci,
      highlights: onlyHigh,
      image: [],
    },
    validationSchema: Yup.object({
      // name: Yup.string().max(255).required("Hotel name is required"),
      // email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      // address: Yup.string().max(255).required("Address is required"),
      // phone: Yup.number().min(10).required("Contact number is required"),
      // description: Yup.string().max(255).required("description is required"),
      // password: Yup.string().max(255).required("Password is required"),
      // state: Yup.string().max(255).required("state is required"),
      // province: Yup.string().max(255).required("province is required"),
      // country: Yup.string().max(255).required("country is required"),
      // mapss: Yup.string().max(255).required("map is required"),
      // facility: Yup.string().max(255).required("facility is required"),
      // highlights: Yup.string().max(255).required("highlights is required"),
    }),
    onSubmit: (values, actions) => {
      console.log({ values });

      let data = new FormData();

      for(let i=0; i < values.image.length; i++){
        data.append("profileImg", values.image[0]);
      }
      
      data.append("name", values.name);
      data.append("address", values.address);
      data.append("hotelid", hotelid);
      data.append("state", values.state);
      data.append("country", values.country);
      data.append("facilities", values.facilities);
      //data.append("highlights", values.highlights);
      data.append("description", values.description);
      data.append("phone", values.phone);

      updateHotel(data);
      // data.append("address", values.address);
      // data.append("email", values.email);
      // data.append("password", values.password);
      // data.append("hotel_type", values.hotel_type);

      //signin(data);
    },
  });

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
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
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
                error={Boolean(formik.touched.address && formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label="address"
                name="address"
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label="Email Address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                InputLabelProps={{
                  shrink: true,
                }}
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
                error={Boolean(formik.touched.country && formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label="Country"
                name="country"
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.province && formik.errors.province)}
                helperText={formik.touched.province && formik.errors.province}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label="province"
                name="province"
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.province}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.state && formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label="state"
                name="state"
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                // error={Boolean(formik.touched.mapss && formik.errors.mapss)}
                //  helperText={formik.touched.mapss && formik.errors.maps}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label="map"
                name="map"
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mapss}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                InputLabelProps={{
                  shrink: true,
                }}
                id="outlined-multiline-static"
                label="description"
                name="description"
                multiline
                rows={4}
                defaultValue="Default Value"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Hotel Facilities</Typography>
            </Grid>
            {/* <Grid item md={12} xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="Facilities">Facilities</InputLabel>
                <Select
                  labelId="Facilities"
                  id="Facilities"
                  multiple
                  name="facilities"
                  //value={personName}
                  //onChange={handleChangeone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.facilities}
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
            </Grid> */}

            {/* <Grid item md={12} xs={12}>
              <Typography variant="h6">Highlights</Typography>
            </Grid> */}

            <Grid item md={12} xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="Facilities">Highlights</InputLabel>
                <Select
                  labelId="highlights"
                  id="highlights"
                  multiple
                  name="highlights"
                  //value={personName}
                  //onChange={handleChangeone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.highlights}
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
            <Grid mt={3} ml={3}>
              <input
                type="file"
                name="files"
                multiple
                onChange={(event) => {
                  formik.setFieldValue("image", event.target.files);
                }}
                //value={formik.values.image}
              />
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
      <ToastContainer />
    </form>
  );
};
