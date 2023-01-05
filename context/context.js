import { createContext, useState, useEffect, useCallback } from 'react'
import { useMoralis } from 'react-moralis'

import { useMoralisQuery } from 'react-moralis'

export const CoinMarketContext = createContext()

export const CoinMarketProvider = ({ children }) => {
  const { isAuthenticated, user, Moralis } = useMoralis()
  const {
    data: coins,
    error,
    isLoading: loadingCoins,
  } = useMoralisQuery('Coins')

  const [currentAccount, setCurrentAccount] = useState('')
  const [openBuyCryptoModal, setOpenBuyCryptoModal] = useState(false)

  let [coinData, setCoinData] = useState(null)
  const [coinPrices, setCoinPrices] = useState(null)

  const DEFAULT_VALUE = 'Select a token'

  const [srcToken, setSrcToken] = useState(DEFAULT_VALUE)

  const getTopTenCoins = async () => {
    try {
      const res = await fetch('/api/getTopTen')
      const data = await res.json()
      return data.data.data
    } catch (e) {
      console.log(e.message)
    }
  }

  function sort_object(obj) {
    let items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
    });
    items.sort(function(first, second) {
        return second[1][1] - first[1][1];
    });
    const sorted_obj={}
    items.forEach( function(v) {
      const use_key = v[0]
      const use_value = v[1]
      sorted_obj[use_key] = use_value
    })
    return(sorted_obj)
} 
  
  const setData = useCallback(async () => {
    try {
      let apiResponse = await getTopTenCoins()
      const coins = apiResponse.slice(0,10)
      let coinDict = {}
      console.log(coins)
      for (let i = 0; i < coins.length; i++) {
        coinDict[coins[i].symbol] = [coins[i].quote.USD.price, coins[i].quote.USD.percent_change_1h]
      }
      coinDict = sort_object(coinDict)
      setCoinData(coins)
      setCoinPrices(coinDict)
    } catch (e) {
      console.log(e.message)
    }
  }, [getTopTenCoins])

  useEffect(() => {
    if (isAuthenticated) {
      const account = user.get('ethAddress')
      setCurrentAccount(account)
    }
    setData()
  }, [isAuthenticated])

  const openModal = (name) => {
    setSrcToken(name)
    setOpenBuyCryptoModal(true)
  }

  return (
    <CoinMarketContext.Provider
      value={{
        getTopTenCoins,
        coinData,
        coinPrices,
        openBuyCryptoModal,
        setOpenBuyCryptoModal,
        coins,
        loadingCoins,
        openModal,
        currentAccount,
        srcToken,
        setSrcToken,
      }}
    >
      {children}
    </CoinMarketContext.Provider>
  )
}
