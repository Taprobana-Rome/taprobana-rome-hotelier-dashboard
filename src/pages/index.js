import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { CheckIn } from "../components/dashboard/check-in";
import { ScheduleRooms } from "../components/dashboard/schedule-rooms";
import { CheckOuts } from "../components/dashboard/check-outs";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { NewBooking } from "../components/dashboard/new-booking";

const Page = () => (
  <>
    <Head>
      <title>Hotelier Dashboard | Taprobana Rome</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}  justifyContent="center" alignItems="center">
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <NewBooking />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <ScheduleRooms />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CheckIn />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CheckOuts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12} >
            <Sales />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
