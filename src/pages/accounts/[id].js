import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../../components/account/account-profile';
import { AccountProfileDetails } from '../../components/account/account-profile-details';
import { DashboardLayout } from '../../components/dashboard-layout';

const Page = () => (
    <>
      <Head>
        <title>
          Account | Taprobanarome Hotelier
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Account
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={2}
              md={2}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={10}
              md={10}
              xs={12}
            >
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
  
  Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;