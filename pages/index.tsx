import type { NextPage } from 'next'
import Header from '../components/header'
import Trending from '../components/trending'
import CMCtable from '../components/cmc-table/cmcTable'
import SwapCryptoModal from '../components/swapCryptoModal'
// import Moralis from 'moralis';
// import express from 'express';
// import cors from 'cors';
// import { parseDashboard } from '../auth/parseDashboard';
// import { parseServer } from '../auth/parseServer';
// // import { errorHandler } from '../auth/errorHandler';
// import config from '../auth/config';
// import { apiRouter } from './apiRouter';

// const app = express();

// Moralis.start({
//   apiKey: config.MORALIS_API_KEY,
// });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(cors());

// app.use(`/${config.SERVER_ENDPOINT}`, parseServer);
// app.use('/dashboard', parseDashboard);
// app.use('/api', apiRouter);
// // app.use(errorHandler);

// app.use(express.static('public'));

// app.listen(config.PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`${config.APP_NAME} is running on port ${config.PORT}`);
// });


const Home: NextPage = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <SwapCryptoModal />
      <div className='mt-10' />
      <Trending />
      <div className='mt-20' />
      <CMCtable />
    </div>
  )
}

export default Home
