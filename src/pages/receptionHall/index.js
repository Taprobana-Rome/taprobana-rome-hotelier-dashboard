import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { OfferListToolbar } from '../../components/receptionHall/receptionHall-list-toolbar';
import { OfferListResults } from '../../components/receptionHall/receptionHall-list';

const Page = () => (
  <>
    <Head>
      <title>
      ReceptionHall | Taprobanarome Hotelier
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <OfferListToolbar />
        <Box sx={{ mt: 3 }}>
          <OfferListResults/>
       
        </Box>
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