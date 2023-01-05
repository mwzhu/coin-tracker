import { useContext } from 'react'
import btc from '../../assets/btc.png'
import { CoinMarketContext } from '../../context/context'
import CMCtableHeader from './CMCTableHeader'
import CMCtableRow from './cmcTableRow'

const CMCtable = () => {
  let { coinData } = useContext(CoinMarketContext)

  return (
    <div className='text-white font-bold'>
      <div className='mx-auto max-w-screen-2xl'>
        <table className='w-full'>
          <CMCtableHeader />

          {coinData && coinData ? (
            coinData.map((coin, index) => {
              return (
                <CMCtableRow
                  key={index}
                  starNum={coin.cmc_rank}
                  coinName={coin.name}
                  coinSymbol={coin.symbol}
                  coinIcon={btc}
                  showBuy={true}
                  hRate={coin.quote.USD.percent_change_24h}
                  dRate={coin.quote.USD.percent_change_7d}
                  price={coin.quote.USD.price}
                  marketCapValue={coin.quote.USD.market_cap}
                  volumeCryptoValue={coin.quote.USD.volume_24h}
                  volumeValue={coin.total_supply}
                  circulatingSupply={coin.circulating_supply}
                />
              )
            })
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  )
}

export default CMCtable
