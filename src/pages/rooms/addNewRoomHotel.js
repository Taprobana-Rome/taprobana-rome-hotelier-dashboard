import Head from "next/head";
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
import { DashboardLayout } from "../../components/dashboard-layout";
import Router, { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const route = useRouter();
  const roomId = route.query.roomId;
  const hotelId = localStorage.getItem("id");

  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // console.log(e.currentTarget.files);
    // const files = e.currentTarget.files;
    // formData.append("images", files);

    // await axios.post("http://localhost:5000/room/upload", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
  };

  // const getImage = async () => {
  //   await axios.get("http://localhost:5000/hotelier/63c50e074e4be311cbc8a86f").then((response) => {
  //     setImage(response.data.images);
  //   });
  // };

  const notifySuccess = () =>
    toast.success("Room Added Successfuly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("Room Added Error", {
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
      .post("http://localhost:5000/room/room/", values)
      .then((response) => {
        console.log("roomId", response.data._id);
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      type: "",
      price: 0,
      description: "",
      isBooking: false,
      capacity: 0,
      bed_count: 0,
      sqft: 0,
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

  return (
    <>
      <Head>
        <title>New Room | TaprobanaRome</title>
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
            <Typography color="text.primary">Add new room</Typography>
          </Breadcrumbs>
          <Box sx={{ mt: 3 }}>
            <h1>Add new Room</h1>

            {/* <form onSubmit={submit} encType="multipart/form-data"> */}
            {/* <input type="file" name="file" multiple /> */}
            {/* <input
                onChange={(e) => setFile(e.target.files)}
                type="file"
                accept="image/*"
                name="file"
                multiple
              ></input> */}

            {/* <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                placeholder="Caption"
              ></input>
              <button type="submit">Submit</button>
            </form>

            <button onClick={() => getImage()} type="submit">
              Get image
            </button>

            <button onClick={() => createRoom()} type="submit">
              Create room
            </button> */}

            {/* <img src={image}></img> */}

            {/* ============================== */}

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
                      onChange={formik.handleChange}
                      value={formik.values.type}
                      variant="outlined"
                    >
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
                      onChange={formik.handleChange}
                      value={formik.values.sqft}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                  Add new room
                </Button>
              </form>
            </Box>

            {/* ============================== */}
          </Box>
        </Container>
      </Box>
      <ToastContainer />
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
