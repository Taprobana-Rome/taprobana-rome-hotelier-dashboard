import Head from "next/head";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import { id } from "date-fns/locale";
import { useState } from "react";
import axios from "axios";

const Page = () => {
  const route = useRouter();
  const roomId = route.query.roomId;

  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("email", "hirunaputha16@gmail.com");
    formData.append("password", "password");
    formData.append("name", "Hiruna hotel16");
    formData.append("address", "Malabe");

    await axios.post("http://localhost:5000/hotelier/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const getImage = async () => {
    await axios.get("http://localhost:5000/hotelier/63c50e074e4be311cbc8a86f").then((response) => {
     setImage(response.data.images)
    });
  };

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

            <form onSubmit={submit}>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
              ></input>
              <input
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

            <img src={image}></img>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
