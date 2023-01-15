import Head from "next/head";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import { id } from "date-fns/locale";

const Page = () => {
  const route = useRouter();
  const roomId = route.query.roomId;

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
           
            <Link
              underline="hover"
              color="inherit"
              href="/rooms"
            >
              Rooms
            </Link>
            <Typography color="text.primary">Add new room</Typography>
          </Breadcrumbs>
          <Box sx={{ mt: 3 }}>
            <h1>Add new Room</h1>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
