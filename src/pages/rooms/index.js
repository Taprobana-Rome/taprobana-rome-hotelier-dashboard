import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { RoomListResults } from "../../components/rooms/room-list";
import { RoomListToolbar } from "../../components/rooms/room-list-toolbar";

const Page = () => (
  <>
    <Head>
      <title>Rooms | Taprobanarome Hotelier</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <RoomListToolbar />
        <Box sx={{ mt: 3 }}>
          <RoomListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
