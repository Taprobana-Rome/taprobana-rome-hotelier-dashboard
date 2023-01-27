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

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(e.currentTarget.files);
    const files = e.currentTarget.files;
    formData.append('images', files);
  
    await axios.post("http://localhost:5000/room/upload", formData,{
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const getImage = async () => {
    await axios.get("http://localhost:5000/hotelier/63c50e074e4be311cbc8a86f").then((response) => {
      setImage(response.data.images);
    });
  };

  const createRoom = async () => {
    const roomData = {
      type: "adoooooooooo",
      price: 10000,
      description: "yyyyyy",
      isBooking: true,
      hotel: "xxxxxx",
      capacity: 10,
      bed_count: 22,
      bathroom: "xxxxxxxx",
      discount: { discount_msg: "yyyyyy", discount_amount: 10 },
    };
    await axios
      .post("http://localhost:5000/room/room/63c7abe4f88c45616231628a", roomData)
      .then((response) => {
        localStorage.setItem("roomId", response.data._id);
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

            <form onSubmit={submit} encType='multipart/form-data'>
            <input type='file' name='file' multiple />
              {/* <input
                onChange={(e) => setFile(e.target.files)}
                type="file"
                accept="image/*"
                name="file"
                multiple
              ></input> */}

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

            <button onClick={() => createRoom()} type="submit">
              Create room
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
