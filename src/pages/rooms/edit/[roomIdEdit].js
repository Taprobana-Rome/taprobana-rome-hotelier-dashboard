import Head from "next/head";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const route = useRouter();
  const roomId = route.query.roomIdEdit;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/room/6377c3a116bca4038cc33e41");
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
           
           <Link
             underline="hover"
             color="inherit"
             href="/rooms"
           >
             Rooms
           </Link>
           <Typography color="text.primary">{roomId}</Typography>
         </Breadcrumbs>
          <Box sx={{ mt: 3 }}>
            <h1>Edit Room - {roomId}</h1>
            <p>{JSON.stringify(tableData)}</p>
            {console.log(JSON.stringify(tableData))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
