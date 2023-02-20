import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const notifyError = (err) =>
    toast.error(err, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const logins = (values) => {
    console.log("value=>", values);
    axios
      .post("http://localhost:5000/hotelier/login", values)
      .then((res) => {
        if (!res) {
          alert("loading");
        } else if (res.data.status === "SUCCESS") {
          Router.push("/");
        } else {
          notifyError(res.data.message);

          console.log("error=>", res.data);
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("id", res.data._id);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("hotelType", res.data.hotelType);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error=>", err);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values) => {
      logins(values);
    },
  });

  return (
    <>
      <Head>
        <title>Login | Taprobanarome Hotelier</title>
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
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(./static/images/login/login-bg.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box mb={3}>
                <img src="./static/images/login/logo.png" />
              </Box>

              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Container maxWidth="sm">
                <form onSubmit={formik.handleSubmit}>
                  <Box
                    sx={{
                      pb: 1,
                      pt: 3,
                    }}
                  ></Box>
                  {/* {emailError && <Alert severity="error">{emailError}</Alert>} */}
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
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign In
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body2">
                    Don&apos;t have an account?{" "}
                    <NextLink href="/register">
                      <Link
                        to="/register"
                        variant="subtitle2"
                        underline="hover"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        Sign Up
                      </Link>
                    </NextLink>
                  </Typography>
                </form>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Login;
