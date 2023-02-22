import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const Register = () => {
  const signin = (values) => {
    console.log("log data", values);
    const data = axios
      .post("https://taprobanarome.azurewebsites.net/hotelier/hotel", values)
      .then((res) => {
        Router.push("/verified.html");
        console.log(res);

        //Router.push("/").catch(console.error);
        //ocalStorage.setItem("token", res.data.token);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      contact: "",
      password: "",
      hotelType: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Hotel name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      //address: Yup.string().max(255).required("Address is required"),
      //contact: Yup.number().min(10).required("Contact number is required"),
      //vat: Yup.string().max(255).required("Contact is required"),
      //businessRegNumber: Yup.string().max(255).required("Business Registration Number is required"),
      password: Yup.string().max(255).required("Password is required"),
      //policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: (values) => {
      console.log(values);
      signin(values);
    },
  });

  return (
    <>
      <Head>
        <title>Hotelier Register | Taprobana</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm" style={{ marginTop: "50px", marginBottom: "50px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your official hotel email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Hotel Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Address"
              margin="normal"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.contact && formik.errors.contact)}
              fullWidth
              helperText={formik.touched.contact && formik.errors.contact}
              label="Contact Number"
              margin="normal"
              name="contact"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.contact}
              variant="outlined"
            />
            <Grid mt={2} mb={1}>
              <FormControl fullWidth>
                <InputLabel mt={5} id="demo-simple-select-label">
                  Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="hotelType"
                  //value={age}
                  label="hotel type"
                  //onChange={handleChange}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.hotelType}
                >
                  <MenuItem value={"Hotel"}>Hotel</MenuItem>
                  <MenuItem value={"Resort"}>Resort</MenuItem>
                  <MenuItem value={"Villa"}>Villa</MenuItem>
                  <MenuItem value={"Apartment"}>Apartment</MenuItem>
                  <MenuItem value={"Glamping"}>Glamping</MenuItem>
                  <MenuItem value={"Luxury Hostels"}>Luxury Hostels</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="/terms" passHref>
                  <a target="_blank">
                    <Link color="primary" underline="always" variant="subtitle2">
                      Terms and Conditions
                    </Link>
                  </a>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
