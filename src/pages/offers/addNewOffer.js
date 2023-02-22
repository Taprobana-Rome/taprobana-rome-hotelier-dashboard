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
import { useFormik, yupToFormErrors } from "formik";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Page = () => {
  const route = useRouter();
  const roomId = route.query.roomId;
  const hotelId = localStorage.getItem("id");

  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState(dayjs(new Date()));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  };

  const notifySuccess = () =>
    toast.success("Offer Added Successfuly", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("Error occured when room added", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const createRoom = async (values) => {
    await axios
      .post("https://taprobanarome.azurewebsites.net//offer/", values)
      .then((response) => {
        console.log("roomId", response.data._id);
        notifySuccess();
      })
      .catch((err) => notifyError());
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      discount: 0,
      expireTime: value,
      hotelId:hotelId
    },
    validationSchema: Yup.object({
      description: Yup.string().max(1000).required("Description is required"),
      discount: Yup.number()
        .max(100)
        .required("Discount amount is required(If no descount use '0')"),
      expireTime: Yup.string().required("Plese select offer expire date and time"),
    }),
    onSubmit: (values, action) => {
      createRoom(values)
        .then()
        .catch((err) => notifyError());

      console.log(values);
    },
  });

  return (
    <>
      <Head>
        <title>New Offer | TaprobanaRome</title>
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
            <Link underline="hover" color="inherit" href="/offers">
              Offer
            </Link>
            <Typography color="text.primary">Add New Offer</Typography>
          </Breadcrumbs>
          <Box sx={{ mt: 3 }}>
            <h1>Add new Offer</h1>

            <Box mt={5} mx={5}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  error={Boolean(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="Description"
                  margin="normal"
                  name="description"
                  multiline
                  rows={4}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  variant="outlined"
                />

                <Grid container spacing={2} mb={5}>
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(formik.touched.discount && formik.errors.discount)}
                      fullWidth
                      helperText={formik.touched.discount && formik.errors.discount}
                      label="Discount amount"
                      margin="normal"
                      name="discount"
                      type="number"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.discount}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} mt={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Expire date & time"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                  Add new offer
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
