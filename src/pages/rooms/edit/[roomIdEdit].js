import Head from "next/head";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const Page = () => {
  const route = useRouter();
  const roomId = route.query.roomIdEdit;
  const [tableData, setTableData] = useState([]);
  const hotelId = localStorage.getItem("id");

  const notifySuccess = () =>
    toast.success("Room Updated Successfuly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // console.log(tableData.type);

  const notifyError = () =>
    toast.error("Room update Error", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const createRoom = async (values) => {
    await axios
      .patch("http://localhost:5000/room/" + roomId, values)
      .then((response) => {
        console.log("roomId", response.data._id);
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: tableData.type,
      price: tableData.price,
      description: tableData.description,
      isBooking: tableData.isBooking,
      capacity: tableData.isBooking,
      bed_count: tableData.bed_count,
      sqft: tableData.sqft,
      hotel: hotelId,
    },
    validationSchema: Yup.object({
      type: Yup.string().max(255).required("Room type is required"),
      price: Yup.number().nullable(false).required("price is required"),
      description: Yup.string().max(1000).required("Description is required"),
      isBooking: Yup.bool(),
      capacity: Yup.number().required("capacity is required"),
      bed_count: Yup.number().required("Bed count is required"),
    }),
    onSubmit: (values, action) => {
      createRoom(values)
        .then(notifySuccess())
        .catch((err) => notifyError());

      console.log(values);

      // Router.push("/").catch(console.error);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/room/" + roomId);
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Edit Room | TaprobanaRome</title>
      </Head>
      <Box
        component="main"
        A
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/rooms">
              Rooms
            </Link>
            <Typography color="text.primary">{roomId}</Typography>
          </Breadcrumbs>
          <Box mt={5} mx={5}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.type && formik.errors.type)}
                    fullWidth
                    helperText={formik.touched.type && formik.errors.type}
                    label="Type"
                    margin="normal"
                    name="type"
                    select
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    onChange={formik.handleChange}
                    value={formik.values.type}
                    variant="outlined"
                  >
                    {console.log("type=>",formik.values.type)}
                    {roomTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.price && formik.errors.price)}
                    fullWidth
                    helperText={formik.touched.price && formik.errors.price}
                    label="price"
                    margin="normal"
                    name="price"
                    type="number"
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <TextField
                error={Boolean(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="description"
                margin="normal"
                name="description"
                multiline
                rows={4}
                onBlur={formik.handleBlur}
                InputLabelProps={{ shrink: true }}
                onChange={formik.handleChange}
                value={formik.values.description}
                variant="outlined"
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.isBooking && formik.errors.isBooking)}
                    fullWidth
                    helperText={formik.touched.isBooking && formik.errors.isBooking}
                    label="isBooking"
                    margin="normal"
                    name="isBooking"
                    select
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    onChange={formik.handleChange}
                    value={formik.values.isBooking}
                    variant="outlined"
                  >
                    {roomStatus.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.bed_count && formik.errors.bed_count)}
                    fullWidth
                    helperText={formik.touched.bed_count && formik.errors.bed_count}
                    label="bed_count"
                    margin="normal"
                    name="bed_count"
                    type="number"
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    onChange={formik.handleChange}
                    value={formik.values.bed_count}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.capacity && formik.errors.capacity)}
                    fullWidth
                    helperText={formik.touched.capacity && formik.errors.capacity}
                    label="capacity"
                    margin="normal"
                    name="capacity"
                    type="number"
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    onChange={formik.handleChange}
                    value={formik.values.capacity}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.sqft && formik.errors.sqft)}
                    fullWidth
                    helperText={formik.touched.sqft && formik.errors.sqft}
                    label="sqft"
                    margin="normal"
                    name="sqft"
                    type="number"
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    onChange={formik.handleChange}
                    value={formik.values.sqft}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Update Room
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

const roomTypes = [
  {
    value: "standard",
    label: "Standard Room",
  },
  {
    value: "deluxe",
    label: "Deluxe Room",
  },
  {
    value: "supreme",
    label: "Supreme Room",
  },
];

const roomStatus = [
  {
    value: true,
    label: "Booked",
  },
  {
    value: false,
    label: "Not booked",
  },
];
