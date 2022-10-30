import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { SessionProvider } from "next-auth/react";
import Container from "@mui/material/Container";

import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";

function MyApp({ Component, pageProps: session, ...pageProps }) {
  return (
    <SessionProvider session={session}>
      <Container style={{ marginTop: "2rem" }}>
        <Navigation />
        <Component {...pageProps} style={{ marginTop: "2rem" }} />
        <Footer />
      </Container>
    </SessionProvider>
  );
}

export default MyApp;