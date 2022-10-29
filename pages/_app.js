import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Navigation from '../Components/Navigation'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';

function MyApp({ Component, pageProps: session, ...pageProps }) {
  return (
    <SessionProvider session={ session }>
      <Container style={{ marginTop: "2rem"}}>
        <Navigation/>
        <Component {...pageProps} style={{marginTop: "2rem"}}/>
      </Container>
    </SessionProvider>
  )
}

export default MyApp