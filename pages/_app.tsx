import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CoinMarketProvider } from '../context/context'
import { GunProvider } from '../context/gunContext'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <MoralisProvider
      serverUrl='https://coinmarketswap.herokuapp.com/server'
      appId='001'
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
