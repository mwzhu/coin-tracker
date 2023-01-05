import { useContext } from 'react'
import Image from 'next/image'

import { CoinMarketContext } from '../../context/context'
import { coinImages } from '../../lib/constants'

const styles = {
  coinNameRow: 'flex items-center',
  buyButton: `bg-[#1A1F3A] text-[#6188FF] p-1 px-3 text-sm rounded-lg cursor-pointer hover:opacity-50`,
}

const CoinNameRow = ({ symbol, icon, clicked }) => {
  const { openModal } = useContext(CoinMarketContext)

  return (
    <div className={styles.coinNameRow}>
      <div className='mr-3 flex' onClick={clicked}>
        <div className='mr-2'>{
          <Image
            src={coinImages[symbol][0]}
            className='rounded-full'
            width={20}
            height={20}
            alt=''
          />
          }
          </div>
        {coinImages[symbol][1]}
      </div>

      <p>
        {(
          <span className={styles.buyButton} onClick={() => openModal(symbol)}>
            Swap
          </span>
        )}
      </p>
    </div>
  )
}

export default CoinNameRow
