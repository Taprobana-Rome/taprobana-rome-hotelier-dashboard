import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FileUpload from "react-material-file-upload";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SettingsNotifications = (props) => {
  const [dta, setDta] = useState();
  const [files, setFiles] = useState([]);

  const getData = async () => {
    const images = await axios.get("http://localhost:5000/hotelier/");
    setDta(images.data.imageArray);
    console.log("pp", images);
  };

  useEffect(() => {
    //getData();
  }, []);

  const hotelierType = "hotel";

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
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

      console.log(values.image);

      // let data = new FormData();

      // for (let i = 0; i < values.image.length; i++) {
      //   data.append("profileImg", values.image[0]);
      //   console.log("imgq",values.image[0])
      // }

      // data.append("address", values.address);
      // data.append("email", values.email);
      // data.append("password", values.password);
      // data.append("hotel_type", values.hotel_type);

      //signin(data);
    },
  });

  return (
    <>
      {hotelierType === "hotel" && (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Card>
              <CardContent>
                <Grid container spacing={6} wrap="wrap">
                  <Grid
                    item
                    md={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    xs={12}
                  >
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Hotel Gallery
                    </Typography>
                    <Grid mb={3} mt={3}>
                      <Typography mt={2} color="textPrimary" gutterBottom variant="h7">
                      Hotel gallery Gallery Upload
                      </Typography>
                      <Grid>
                        <FileUpload
                          multiple
                          value={formik.values.image}
                          onChange={(event) => {
                            formik.setFieldValue("image", event);
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid mb={3} mt={3}>
                      <Typography mt={2} color="textPrimary" gutterBottom variant="h7">
                        Delux Room Gallery Upload
                      </Typography>
                      <Grid>
                        <FileUpload
                          multiple
                          value={formik.values.image}
                          onChange={(event) => {
                            formik.setFieldValue("image", event);
                          }}
                        />
                      </Grid>
                    </Grid>


                    <Grid mb={3} mt={3}>
                      <Typography mt={2} color="textPrimary" gutterBottom variant="h7">
                      Standard Room Gallery Upload
                      </Typography>
                      <Grid>
                        <FileUpload
                          multiple
                          value={formik.values.image}
                          onChange={(event) => {
                            formik.setFieldValue("image", event);
                          }}
                        />
                      </Grid>
                    </Grid>


                    <Grid mb={3} mt={3}>
                      <Typography mt={2} color="textPrimary" gutterBottom variant="h7">
                      Suprime Room Gallery Upload
                      </Typography>
                      <Grid>
                        <FileUpload
                          multiple
                          value={formik.values.image}
                          onChange={(event) => {
                            formik.setFieldValue("image", event);
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid mb={3} mt={3}>
                      <Typography mt={2} color="textPrimary" gutterBottom variant="h7">
                      Family  Gallery Upload
                      </Typography>
                      <Grid>
                        <FileUpload
                          multiple
                          value={formik.values.image}
                          onChange={(event) => {
                            formik.setFieldValue("image", event);
                          }}
                        />
                      </Grid>
                    </Grid>
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
                  Save
                </Button>
              </Box>
            </Card>
          </form>
        </>
      )}
    </>
  );
};
