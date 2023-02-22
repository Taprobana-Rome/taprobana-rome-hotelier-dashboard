import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Page = () => (
  <>
    <Head>
      <title>Terms and conditions</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: "left",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          mt={5}
          sx={{
            alignItems: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="left" color="textPrimary" variant="h4">
            Terms and Conditions
          </Typography>
          <Typography align="left" mt={3} color="textPrimary" variant="h6">
            Introduction about the institution
          </Typography>

          <Typography mt={1} align="left" color="textPrimary" variant="subtitle2">
          &quot;Latest Update January 2023&quot; Our company is legally registered under the valid laws of
            Sri Lanka and we are present as Elysian win way (PVT)Ltd. The name &quot;Taprobana Rome&quot; is
            our business name and it represents only our website and mobile application. Our office
            is located at (Us 6 / Dinapola / Moratuwa) and you can connect any time via the phone
            number provided to you.
          </Typography>

          <Typography align="left" mt={2} color="textPrimary" variant="h6">
            Conditions and rules
          </Typography>

          <Typography mt={1} align="left" color="textPrimary" variant="subtitle2">
            <ol>
              <li>
                The hotelier&apos;s general dashboard form provided by us is the same for all hotels and
                ensure that you only keep the account information that you set up before doing
                business with us.
              </li>
              <li>
                Fill in the hotelier&apos;s general dashboard form and be more careful while registering
                and updating.
              </li>
              <li>
                We do not check the prices, discounts, special offers, etc. that you do in the
                hotelier&apos;s general dashboard form, and our customers can use that information from
                that moment. Note: This procedure is provided only for your convenience
              </li>
              <li>
                We would like to inform you that if you make any omissions as mentioned above, you
                will be held responsible for the same. Note: If there is any technical error, please
                contact us.
              </li>
              <li>
                Here, we have made it possible to update any special occasion for the development of
                your business and for the convenience of all customers and it is important to pay
                more attention to those dates and times.
              </li>
              <li>
                You must ensure that the facilities shown to the customers are provided without any
                change. Note: If there is any change, our customers can inform us about it and share
                their opinions publicly.
              </li>
              <li>
                Any customer has the ability to share their opinions and experiences through our
                website or mobile application. You should have a sound understanding about that
              </li>
              <li>
                We have provided a new facility called &quot;quick checking&quot; to customers who have made a
                reservation through our website or mobile phone application and come to the hotel
                and we have explained below how this happens.
              </li>
            </ol>
          </Typography>

          <Typography mt={1} align="left" color="textPrimary" variant="subtitle2">
            <i>&quot;Introduction to Quick Checking Facility&quot;</i>
          </Typography>
          <Typography mt={1} align="left" color="textPrimary" variant="subtitle2">
            Customers who come to your hotel premises have a good understanding of the cancellation
            policy for all hotels, and he or she can get this &quot;quick checking&quot; facility from 10.00
            a.m on the day of the relevant reservation. All her information is given to you. The
            information will be sent to your hotelier&apos;s dashboard immediately and you can fill in
            the information on the guest registration form, and after the customer arrives, it is
            your responsibility to obtain the national of card / passport documents to confirm his
            or her identity.
          </Typography>

          <Typography align="left" mt={3} color="textPrimary" variant="h6">
            Payment details
          </Typography>

          <Typography mt={1} align="left" color="textPrimary" variant="subtitle2">
            <ol>
              <li>
                If a customer pays the full amount or half of it through online payment before the
                customer arrives, all arrangements have been made in such a way that the amount will
                be credited to the bank account given to us by the company. and within 24 hours or
                less, the company should arrange to receive a payment confirmation receipt.
                Otherwise, we will believe that the relevant payment has been received by you.
              </li>
              <li>
                The bank account information provided to us by your organization must be correct and
                you must contact us for any correction or update.
              </li>
              <li>
                We will charge you a percentage of 10% for each reservation and you must arrange to
                receive the relevant amount before the 25th of every month. Note: You should clearly
                mention the name of the institution while crediting the money and we will give you
                the details about our accounts.
              </li>
              <li>
                Through our website or mobile phone application, any customer has been given the
                facility to make online payment or pay in person.
              </li>
            </ol>
          </Typography>
          <Typography align="left" mt={3} color="textPrimary" variant="h6">
            No Show Policy
          </Typography>

          <Typography mt={1} align="left" color="textPrimary" variant="subtitle2">
            <ol>
              <li>
                If a customer does not attend the reservation, you must notify, us through an email
                message.
              </li>
              <li>
                If a customer makes an advance payment, his or her reservation will be confirmed and
                it is possible to make a reservation without paying any amount. In that case,
                reservations without any payment will be canceled automatically three days before
                the relevant arrival date. Furthermore, we remind you that all information and
                prices provided by you, must be true and not subject to any change.
              </li>
            </ol>
            <Typography mt={1} mb={10} align="left" color="textPrimary" variant="subtitle2">
              Note: The information mentioned here may be subject to change at any time and if it
              happens, we will inform you fully about it. It can be done by phone and email
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
