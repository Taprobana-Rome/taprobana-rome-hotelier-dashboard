import Head from "next/head";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Page = () => {
  const route = useRouter();
  const offerId = route.query.offerIdEdit;
  const [tableData, setTableData] = useState([]);
  const hotelId = localStorage.getItem("id");
  const [value, setValue] = useState(dayjs(tableData.expireTime));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const notifySuccess = () =>
    toast.success("Offer Updated Successfuly", {
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
    toast.error("Offer update Error", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const updateOffer = async (values) => {
    await axios
      .patch("http://localhost:5000/offer/" + offerId, values)
      .then((response) => {
        console.log("offerID", response.data._id);
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: tableData.description,
      discount: tableData.discount,
      expireTime: value,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(1000).required("Description is required"),
      discount: Yup.number()
        .max(100)
        .required("Discount amount is required(If no descount use '0')"),
      expireTime: Yup.string().required("Plese select offer expire date and time"),
    }),
    onSubmit: (values, action) => {
      updateOffer(values)
        .then(notifySuccess(), console.log("success"))
        .catch((err) => notifyError());

      console.log("values=>", values);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/offer/offers/" + offerId);
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log("tabledata=>", tableData);

  return (
    <>
      <Head>
        <title>Edit Offer | TaprobanaRome</title>
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
              Offers
            </Link>
            <Typography color="text.primary">{offerId}</Typography>
          </Breadcrumbs>
          <Box mt={5} mx={5}>
            <form onSubmit={formik.handleSubmit}>
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

              <Grid container spacing={2} mb={5}>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.discount && formik.errors.discount)}
                    fullWidth
                    helperText={formik.touched.discount && formik.errors.discount}
                    InputLabelProps={{ shrink: true }}
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
                      value={formik.values.expireTime}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Update offer
              </Button>
            </form>
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
