import { useContext, useState, useRef, useEffect } from 'react'
import { CoinMarketContext } from '../context/context'
import { ArrowSmDownIcon } from '@heroicons/react/outline'
import SwapField from './SwapField'
import { useMoralis } from 'react-moralis'
import { coinInfo } from '../lib/constants'
import TransactionStatus from './TransactionStatus'
import toast, { Toaster } from 'react-hot-toast'

const styles = {
  modal: `w-screen h-screen bg-gray-900/90 z-10 fixed top-0 left-0 flex items-center justify-center`,
  modalContent: `bg-white rounded-lg p-3 w-max w-1/3`,
  input: `w-full p-2 border rounded-lg mb-5 border-gray-600/50 outline-none`,
  button: `bg-[#6188FF] p-2 px-5 rounded-lg text-white hover:opacity-50`,
  label: `font-bold text-3xl`,
  closeModalButton: `hover:text-red-300 text-white cursor-pointer`,
}

const SwapCryptoModal = () => {
  const {
    openBuyCryptoModal,
    setOpenBuyCryptoModal,
    coinPrices,
    currentAccount,
    srcToken,
    setSrcToken
  } = useContext(CoinMarketContext)

  const ETH = 'ETH'

  const DEFAULT_VALUE = 'Select a token'

  // const [srcToken, setSrcToken] = useState(ETH) // change
  const [destToken, setDestToken] = useState(DEFAULT_VALUE)

  const [inputValue, setInputValue] = useState()
  const [outputValue, setOutputValue] = useState()

  const inputValueRef = useRef()
  const outputValueRef = useRef()

  const isReversed = useRef(false)

  const INCREASE_ALLOWANCE = 'Increase allowance'
  const ENTER_AMOUNT = 'Enter an amount'
  const CONNECT_WALLET = 'Connect wallet'
  const SELECT_TOKEN = 'Select Token'
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
  const { isAuthenticated, user, Moralis } = useMoralis()

  const [txPending, setTxPending] = useState(false)

  const notifyError = msg => toast.error(msg, { duration: 6000 })
  const notifySuccess = () => toast.success('Transaction completed.')

  //Mint function for the token with send ether to the contract
  const newSwap = async () => {
    try {
      setTxPending(true)
      let receipt

      if (srcToken === 'ETH') {
        if (!isAuthenticated) return
        await Moralis.enableWeb3()

        let options = {
          contractAddress: coinInfo[destToken][0],
          functionName: 'mint',
          abi: coinInfo[destToken][1],
          params: {
            to: currentAccount,
            amount: Moralis.Units.Token(outputValue),
          },
        }

        let ethOptions = {
          type: 'native',
          amount: Moralis.Units.ETH(inputValue),
          receiver: coinInfo[destToken][0]
        }
        const ethTransaction = await Moralis.transfer(ethOptions)
        const transaction = await Moralis.executeFunction(options)
        const ethReceipt = await ethTransaction.wait()
        receipt = await transaction.wait(4)
        console.log(ethReceipt)
        console.log(receipt)
      } else if (destToken === 'ETH') {
        if (!isAuthenticated) return
        await Moralis.enableWeb3()

        const fromOptions = {
          type: 'erc20',
          amount: Moralis.Units.Token(inputValue, '18'),
          receiver: coinInfo[srcToken][0],
          contractAddress: coinInfo[srcToken][0],
        }
        const receiveOptions = {
          contractAddress: coinInfo[srcToken][0],
          functionName: 'sendViaCall',
          abi: coinInfo[srcToken][1],
          params: {
            to: currentAccount,
            amount: Moralis.Units.ETH(outputValue),
          },
        }

        let fromTransaction = await Moralis.transfer(fromOptions)
        let rceiveTransaction = await Moralis.executeFunction(receiveOptions)
        receipt = await fromTransaction.wait()
        let receiveReceipt = await rceiveTransaction.wait()
        console.log(receipt)
        console.log(receiveReceipt)
      } else {
        if (!isAuthenticated) return
        await Moralis.enableWeb3()
  
        const fromOptions = {
          type: 'erc20',
          amount: Moralis.Units.Token(inputValue, '18'),
          receiver: coinInfo[srcToken][0],
          contractAddress: coinInfo[srcToken][0],
        }
        const toMintOptions = {
          contractAddress: coinInfo[destToken][0],
          functionName: 'mint',
          abi: coinInfo[destToken][1],
          params: {
            to: currentAccount,
            amount: Moralis.Units.Token(outputValue, '18'),
          },
        }
        let fromTransaction = await Moralis.transfer(fromOptions)
        let toMintTransaction = await Moralis.executeFunction(toMintOptions)
        let fromReceipt = await fromTransaction.wait()
        let toReceipt = await toMintTransaction.wait()
        console.log(fromReceipt)
        console.log(toReceipt)
      }
      setTxPending(false)
      notifySuccess()
    } catch (error) {
      setTxPending(false)
      console.error(error.message)
      notifyError(error.message)
    }
  }

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
    let className = 'p-4 w-full my-2 rounded-xl text-white'
    className +=
      swapBtnText === ENTER_AMOUNT || swapBtnText === SELECT_TOKEN
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
        const srcPrice = coinPrices[srcToken][0]
        const destPrice = coinPrices[destToken][0]
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
      const srcPrice = coinPrices[srcToken][0]
      const destPrice = coinPrices[destToken][0]
      const srcAmount = (destPrice * outputValue) / srcPrice
      setInputValue(srcAmount)
    } catch (error) {
      setInputValue('0')
    }
  }

  const { authenticate, enableWeb3 } = useMoralis();
  const [authError, setAuthError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuth = async (provider) => {
    try {
      setAuthError(null);
      setIsAuthenticating(true);

      // Enable web3 to get user address and chain
      await enableWeb3({ throwOnError: true, provider });
      const { account, chainId } = Moralis;

      if (!account) {
        throw new Error('Connecting to chain failed, as no connected account was found');
      }
      if (!chainId) {
        throw new Error('Connecting to chain failed, as no connected chain was found');
      }

      // Get message to sign from the auth api
      const { message } = await Moralis.Cloud.run('requestMessage', {
        address: account,
        chain: parseInt(chainId, 16),
        network: 'evm',
      });

      // Authenticate and login via parse
      await authenticate({
        signingMessage: message,
        throwOnError: true,
      });
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    // Handling the text of the submit button
    console.log(isAuthenticated)
    if (!isAuthenticated) setSwapBtnText(CONNECT_WALLET)
    else if (srcToken === DEFAULT_VALUE || destToken === DEFAULT_VALUE) setSwapBtnText(SELECT_TOKEN)
    else if (!inputValue || !outputValue) setSwapBtnText(ENTER_AMOUNT)
    else setSwapBtnText(SWAP)
  }, [isAuthenticated, inputValue, outputValue, srcToken, destToken])

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

  useEffect(() => {
    setSrcTokenComp(<SwapField obj={srcTokenObj} ref={inputValueRef} />)
  }, [openBuyCryptoModal])

  const importText = () => {
    if (srcToken == DEFAULT_VALUE || destToken == DEFAULT_VALUE) {
      return
    }
    if (srcToken == "ETH") {
      return <p className = 'text-center text-xs py-4 text-gray-500'>Make sure you are on Goerli testnet and have imported {coinInfo[destToken][0]} ({destToken})</p>
    }
    if (destToken == "ETH") {
      return <p className = 'text-center text-xs py-4 text-gray-500'>Make sure you are on Goerli testnet and have imported {coinInfo[srcToken][0]} ({srcToken})</p>
    }
    return <p className = 'text-center text-xs py-4 text-gray-500'>Make sure you are on Goerli testnet and have imported {coinInfo[srcToken][0]} ({srcToken}) and {coinInfo[destToken][0]} ({destToken})</p>
  }

  if (openBuyCryptoModal)
    return (
      <div className={styles.modal}>
      <div className='bg-zinc-900 w-[35%] p-4 px-6 rounded-xl'>
      <div className='flex items-center justify-between py-2 px-1'>
        <p className = 'text-lg text-white'>Swap</p>
        <p
              className={styles.closeModalButton}
              onClick={() => {
                setOpenBuyCryptoModal(false)
                setInputValue('')
                setOutputValue('')
                setDestToken(DEFAULT_VALUE)
                setSrcToken(ETH)
              }}
            >
              &times;
            </p>
      </div>
      <div className='flex items-center justify-between px-1'>
        {importText()}
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
          if (swapBtnText === CONNECT_WALLET) handleAuth("metamask")
          else if (swapBtnText === SWAP) newSwap()
        }}
      >
        {swapBtnText}
      </button>

      {txPending && <TransactionStatus />}

      <Toaster />
    </div>
    </div>
    )

  return <></>
}

export default SwapCryptoModal
