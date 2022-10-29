import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Navigation from '../Components/Navigation'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function MyApp({ Component, pageProps: session, ...pageProps }) {
  return (
    <SessionProvider session={ session }>
      <Navigation/>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}

export default MyApp