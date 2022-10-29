import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Navigation from '../Components/Navigation'

function MyApp({ Component, pageProps: session, ...pageProps }) {
  return (
    <SessionProvider session={ session }>
      <Navigation/>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}

export default MyApp