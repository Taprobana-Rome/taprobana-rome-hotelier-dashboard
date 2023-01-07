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
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      hotelName: "",
      email: "",
      address: "",
      contact: "",
      vat: "",
      businessRegNumber: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      hotelName: Yup.string().max(255).required("Hotel name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      address: Yup.string().max(255).required("Address is required"),
      contact: Yup.number().min(10).required("Contact number is required"),
      vat: Yup.string().max(255).required("Contact is required"),
      businessRegNumber: Yup.string().max(255).required("Business Registration Number is required"),
      password: Yup.string().max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: () => {
      Router.push("/").catch(console.error);
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
        <Container maxWidth="sm" style={{ marginTop: '50px', marginBottom: '50px' }}>
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Hotelier Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new hotelier account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your hotel email to create a new hotelier account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.hotelName && formik.errors.hotelName)}
              fullWidth
              helperText={formik.touched.hotelName && formik.errors.hotelName}
              label="Hotel Name"
              margin="normal"
              name="hotelName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.hotelName}
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
            />{" "}
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
              label="Contact"
              margin="normal"
              name="contact"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.contact}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.vat && formik.errors.vat)}
              fullWidth
              helperText={formik.touched.vat && formik.errors.vat}
              label="Vat number"
              margin="normal"
              name="vat"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.vat}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.businessRegNumber && formik.errors.businessRegNumber)}
              fullWidth
              helperText={formik.touched.businessRegNumber && formik.errors.businessRegNumber}
              label="Business Registration Number"
              margin="normal"
              name="businessRegNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.businessRegNumber}
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
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Re-enter password"
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
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
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
