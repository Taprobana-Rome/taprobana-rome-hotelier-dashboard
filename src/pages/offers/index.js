import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { OfferListToolbar } from '../../components/offers/offer-list-toolbar';
import { OfferListResults } from '../../components/offers/offer-list';

const Page = () => (
  <>
    <Head>
      <title>
        Offers | Taprobanarome Hotelier
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
