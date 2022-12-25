import type { NextPage } from 'next'
import Header from '../components/header'
import Trending from '../components/trending'
import CMCtable from '../components/cmc-table/cmcTable'

const Home: NextPage = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      {/* <SwapCryptoModal /> */}
      <div className='mt-10' />
      <Trending />
      <div className='mt-20' />
      <CMCtable />
    </div>
  )
}

export default Home
