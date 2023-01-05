import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CoinMarketProvider } from '../context/context'
import { GunProvider } from '../context/gunContext'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }: AppProps) {
  const next_public_server = JSON.stringify(process.env.NEXT_PUBLIC_SERVER)
  const app_id = JSON.stringify(process.env.NEXT_PUBLIC_APP_ID)
  return (
      <MoralisProvider
      serverUrl={next_public_server}
      appId={app_id}
      >
        <GunProvider>
        <CoinMarketProvider>
          <Component {...pageProps} />
        </CoinMarketProvider>
        </GunProvider>
      </MoralisProvider>

  )
}

export default MyApp
