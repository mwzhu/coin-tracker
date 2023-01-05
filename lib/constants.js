import doge from './DogeCoin.json'
import usdt from './Usdt.json'
import usdc from './Usdc.json'
import bnb from './Bnb.json'
import btc from './Bitcoin.json'
import busd from './Busd.json'
import ada from './Cardano.json'
import matic from './Polygon.json'
import xrp from './Xrp.json'

import bnbImage from "../assets/bnb.png"
import btcImage from "../assets/btc.png"
import adaImage from "../assets/cardano.png"
import ethImage from "../assets/eth.png"
import usdcImage from "../assets/usdc.png"
import usdtImage from "../assets/usdt.png"
import xrpImage from "../assets/xrp.png"
import busdImage from "../assets/busd.png"
import dogeImage from "../assets/doge.png"
import maticImage from "../assets/matic.png"




const dogeAbi = doge.abi
const usdtAbi = usdt.abi
const usdcAbi = usdc.abi
const bnbAbi = bnb.abi
const btcAbi = btc.abi
const busdAbi = busd.abi
const adaAbi = ada.abi
const maticAbi = matic.abi
const xrpAbi = xrp.abi

const usdtAddress = '0x621437361d29B8FAfF47c55482549445F61338cA'
const usdcAddress = '0x8A7FE972B5CA064f363a7D3E25237D2DBD766eeF'
const bnbAddress = '0x32C8B7EDeD37E6F918065DA2a153d7D6a023600F'
const btcAddress = '0x5e40d0Ee97A788Ab3dD84B8e2d02CE421e6e1497'
const busdAddress = '0x4D3a49c19fb58D94B91a5050fcB15e0d68b5d58F'
const adaAddress = '0xc93810A3668A5db7B7282896e60dDabd5d16a545'
const dogeAddress = '0x74F715b23908356a1378334503dfA46510c0a54A'
const maticAddress = '0x5883FC5d2482B561520973d9101f540193c921BB'
const xrpAddress = '0x12B5dAF7F78284f1062900F116DA608f35b1eCE3'

export const coinInfo = {
    "BTC": [btcAddress, btcAbi],
    "BNB": [bnbAddress, bnbAbi],
    "BUSD": [busdAddress, busdAbi],
    "ADA": [adaAddress, adaAbi],
    "DOGE": [dogeAddress, dogeAbi],
    "MATIC": [maticAddress, maticAbi],
    "USDC": [usdcAddress, usdcAbi],
    "USDT": [usdtAddress, usdtAbi],
    "XRP": [xrpAddress, xrpAbi],
}

export const coinImages = {
    "BTC": [btcImage, "Bitcoin"],
    "BNB": [bnbImage, "BNB"],
    "ETH": [ethImage, "Ethereum"],
    "ADA": [adaImage, "Cardano"],
    "USDT": [usdtImage, "Tether"],
    "USDC": [usdcImage, "USD Coin"],
    "XRP": [xrpImage, "XRP"],
    "DOGE": [dogeImage, "Dogecoin"],
    "MATIC": [maticImage, "Polygon"],
    "BUSD": [busdImage, "Binance USD"]
}
