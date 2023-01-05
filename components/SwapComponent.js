import React, { useEffect, useState, useRef, useCallback } from 'react'

import { CogIcon, ArrowSmDownIcon } from '@heroicons/react/outline'
import SwapField from './SwapField'
import { useMoralis } from 'react-moralis'

// import TransactionStatus from './TransactionStatus'
// import toast, { Toaster } from 'react-hot-toast'

const SwapComponent = () => {
    const { isAuthenticated, user, Moralis } = useMoralis()
    const [currentAccount, setCurrentAccount] = useState('')
    let [coinData, setCoinData] = useState(null)
  const [coinPrices, setCoinPrices] = useState(null)

  const getTopTenCoins = async () => {
    try {
      const res = await fetch('/api/getTopTen')
      const data = await res.json()
      return data.data.data
    } catch (e) {
      console.log(e.message)
    }
  }
  
  const setData = useCallback(async () => {
    try {
      let apiResponse = await getTopTenCoins()
      const coins = apiResponse.slice(0,10)
      const coinDict = {}
      for (let i = 0; i < coins.length; i++) {
        coinDict[coins[i].symbol] = coins[i].quote.USD.price
      }
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

  console.log(coinPrices)
  const ETH = 'ETH'

  const DEFAULT_VALUE = 'Select a token'

  const [srcToken, setSrcToken] = useState(ETH)
  const [destToken, setDestToken] = useState(DEFAULT_VALUE)

  const [inputValue, setInputValue] = useState()
  const [outputValue, setOutputValue] = useState()

  const inputValueRef = useRef()
  const outputValueRef = useRef()

  const isReversed = useRef(false)

  const INCREASE_ALLOWANCE = 'Increase allowance'
  const ENTER_AMOUNT = 'Enter an amount'
  const CONNECT_WALLET = 'Connect wallet'
  const SWAP = 'Swap'

  const srcTokenObj = {
    id: 'srcToken',
    value: inputValue,
    setValue: setInputValue,
    defaultValue: srcToken,
    ignoreValue: destToken,
    setToken: setSrcToken,
  }

  const destTokenObj = {
    id: 'destToken',
    value: outputValue,
    setValue: setOutputValue,
    defaultValue: destToken,
    ignoreValue: srcToken,
    setToken: setDestToken,
  }

  const [srcTokenComp, setSrcTokenComp] = useState()
  const [destTokenComp, setDestTokenComp] = useState()

  const [swapBtnText, setSwapBtnText] = useState(ENTER_AMOUNT)
  // const [txPending, setTxPending] = useState(false)

  // const notifyError = msg => toast.error(msg, { duration: 6000 })
  // const notifySuccess = () => toast.success('Transaction completed.')

  // const { address } = useAccount()

  useEffect(() => {
    // Handling the text of the submit button

    if (!address) setSwapBtnText(CONNECT_WALLET)
    else if (!inputValue || !outputValue) setSwapBtnText(ENTER_AMOUNT)
    setSwapBtnText(SWAP)
  }, [])

  useEffect(() => {
    if (
      document.activeElement !== outputValueRef.current &&
      document.activeElement.ariaLabel !== 'srcToken' &&
      !isReversed.current
    )
      populateOutputValue(inputValue)

    setSrcTokenComp(<SwapField obj={srcTokenObj} ref={inputValueRef} />)

    if (inputValue?.length === 0) setOutputValue('')
  }, [inputValue, destToken])

  useEffect(() => {
    if (
      document.activeElement !== inputValueRef.current &&
      document.activeElement.ariaLabel !== 'destToken' &&
      !isReversed.current
    )
      populateInputValue(outputValue)

    setDestTokenComp(<SwapField obj={destTokenObj} ref={outputValueRef} />)

    if (outputValue?.length === 0) setInputValue('')

    // Resetting the isReversed value if its set
    if (isReversed.current) isReversed.current = false
  }, [outputValue, srcToken])

  return (
    <div className='bg-zinc-900 w-[35%] p-4 px-6 rounded-xl'>
      <div className='flex items-center justify-between py-4 px-1'>
        <p>Swap</p>
        <CogIcon className='h-6' />
      </div>
      <div className='relative bg-[#212429] p-4 py-6 rounded-xl mb-2 border-[2px] border-transparent hover:border-zinc-600'>
        {srcTokenComp}

        <ArrowSmDownIcon
          className='absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-[#212429] border-4 border-zinc-900 text-zinc-300 rounded-xl cursor-pointer hover:scale-110'
          onClick={handleReverseExchange}
        />
      </div>

      <div className='bg-[#212429] p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600'>
        {destTokenComp}
      </div>

      <button
        className={getSwapBtnClassName()}
        onClick={() => {
          if (swapBtnText === INCREASE_ALLOWANCE) handleIncreaseAllowance()
          else if (swapBtnText === SWAP) handleSwap()
        }}
      >
        {swapBtnText}
      </button>

      {/* {txPending && <TransactionStatus />}

      <Toaster /> */}
    </div>
  )


  function handleReverseExchange(e) {
    // Setting the isReversed value to prevent the input/output values
    // being calculated in their respective side - effects
    isReversed.current = true

    // 1. Swap tokens (srcToken <-> destToken)
    // 2. Swap values (inputValue <-> outputValue)

    setInputValue(outputValue)
    setOutputValue(inputValue)

    setSrcToken(destToken)
    setDestToken(srcToken)
  }

  function getSwapBtnClassName() {
    let className = 'p-4 w-full my-2 rounded-xl'
    className +=
      swapBtnText === ENTER_AMOUNT || swapBtnText === CONNECT_WALLET
        ? ' text-zinc-400 bg-zinc-800 pointer-events-none'
        : ' bg-blue-700'
    className += swapBtnText === INCREASE_ALLOWANCE ? ' bg-yellow-600' : ''
    return className
  }

  function populateOutputValue() {
    if (
      destToken === DEFAULT_VALUE ||
      srcToken === DEFAULT_VALUE ||
      !inputValue
    )
      return

    try {
        const srcPrice = coinPrices[srcToken]
        const destPrice = coinPrices[destToken]
        const destAmount = (srcPrice * inputValue) / destPrice
        setOutputValue(destAmount)
    } catch (error) {
      setOutputValue('0')
    }
  }

  function populateInputValue() {
    if (
      destToken === DEFAULT_VALUE ||
      srcToken === DEFAULT_VALUE ||
      !outputValue
    )
      return

    try {
      if (srcToken !== ETH && destToken !== ETH) setInputValue(outputValue)
      else if (srcToken === ETH && destToken !== ETH) {
        // const outValue = toEth(toWei(outputValue, 14))
        const outValue = inputValue
        setInputValue(outValue)
      } else if (srcToken !== ETH && destToken === ETH) {
        // const outValue = toEth(toWei(outputValue), 14)
        const outValue = inputValue
        setInputValue(outValue)
      }
    } catch (error) {
      setInputValue('0')
    }
  }

  // async function performSwap() {
  //   setTxPending(true)

  //   let receipt

  //   if (srcToken === ETH && destToken !== ETH)
  //     receipt = await swapEthToToken(destToken, inputValue)
  //   else if (srcToken !== ETH && destToken === ETH)
  //     receipt = await swapTokenToEth(srcToken, inputValue)
  //   else receipt = await swapTokenToToken(srcToken, destToken, inputValue)

  //   setTxPending(false)

  //   if (receipt && !receipt.hasOwnProperty('transactionHash'))
  //     notifyError(receipt)
  //   else notifySuccess()
  // }

}

export default SwapComponent
