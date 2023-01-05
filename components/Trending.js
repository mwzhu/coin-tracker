import Rate from "./cmc-table/Rate"
import fire from "../assets/fire.png"
import btc from "../assets/btc.png"
import usdt from "../assets/usdt.png"
import gainers from "../assets/gainers.png"
import recent from "../assets/recent.png"
import TrendingCard from "./TrendingCard"
import { useContext } from "react"
import { CoinMarketContext } from '../context/context'
import { coinImages } from "../lib/constants"

const styles = {
    trendingWrapper: `mx-auto max-w-screen-2xl`,
    h1: `text-3xl text-white`,
    flexCenter: `flex items-center,`
}

const formatNum = num => {
    return Number(num.toFixed(2)).toLocaleString()
  }

const Trending = () => {
    let { coinPrices } = useContext(CoinMarketContext)

    const initialData = [
        {
            number: 1,
            symbol: "BTC",
            name: "Bitcoin",
            icon: btc,
            isIncrement: true,
            rate: "2.34%"
        }, {
            number: 2,
            symbol: "USDT",
            name: "Tether",
            icon: usdt,
            isIncrement: false,
            rate: "9.32%"
        }, {
            number: 3,
            symbol: "BTC",
            name: "Bitcoin",
            icon: btc,
            isIncrement: true,
            rate: "2.34%"
        },
    ]

    return <div className="text-white">
        <div className={styles.trendingWrapper}>
            <div className="flex justify-between">
                <h1 className={styles.h1}>Today's Cryptocurrency Prices by Market Cap</h1>
            </div>
            <br />
            <div className="flex">
                <p>The global crypto market cap is $812.93B, a &nbsp; </p>
                <span> <Rate isIncrement={true} rate='0.01%' /> </span>
                <p> &nbsp; increase over the last day. <span className="underline">Read More</span> </p>
            </div>
            <br />

            {coinPrices && coinPrices ? (
                <div className={styles.flexCenter}>
                    <TrendingCard title='Trending' icon={fire} trendingData={[
                        {
                            number: 1,
                            symbol: "BTC",
                            name: "Bitcoin",
                            icon: coinImages["BTC"][0],
                            isIncrement: ((coinPrices["BTC"][1]) >= 0),
                            rate: `${formatNum(coinPrices["BTC"][1])}%`,
                        }, {
                            number: 2,
                            symbol: "ETH",
                            name: "Ethereum",
                            icon: coinImages["ETH"][0],
                            isIncrement: ((coinPrices["ETH"][1]) >= 0),
                            rate: `${formatNum(coinPrices["ETH"][1])}%`,
                        }, {
                            number: 3,
                            symbol: "USDT",
                            name: "Tether",
                            icon: coinImages["USDT"][0],
                            isIncrement: ((coinPrices["USDT"][1]) >= 0),
                            rate: `${formatNum(coinPrices["USDT"][1])}%`,
                        },
                        ]} 
                    />
                    <TrendingCard title='Biggest Gainers' icon={gainers} trendingData={[
                        {
                            number: 1,
                            symbol: Object.keys(coinPrices)[0],
                            name: coinImages[Object.keys(coinPrices)[0]][1],
                            icon: coinImages[Object.keys(coinPrices)[0]][0],
                            isIncrement: ((coinPrices[Object.keys(coinPrices)[0]][1]) >= 0),
                            rate: `${formatNum(coinPrices[Object.keys(coinPrices)[0]][1])}%`,
                        }, {
                            number: 2,
                            symbol: Object.keys(coinPrices)[1],
                            name: coinImages[Object.keys(coinPrices)[1]][1],
                            icon: coinImages[Object.keys(coinPrices)[1]][0],
                            isIncrement: ((coinPrices[Object.keys(coinPrices)[1]][1]) >= 0),
                            rate: `${formatNum(coinPrices[Object.keys(coinPrices)[1]][1])}%`,
                        }, {
                            number: 3,
                            symbol: Object.keys(coinPrices)[2],
                            name: coinImages[Object.keys(coinPrices)[2]][1],
                            icon: coinImages[Object.keys(coinPrices)[2]][0],
                            isIncrement: ((coinPrices[Object.keys(coinPrices)[2]][1]) >= 0),
                            rate: `${formatNum(coinPrices[Object.keys(coinPrices)[2]][1])}%`,
                        },
                        ]} />
                    <TrendingCard title='Recently Added' icon={recent} trendingData={[
                        {
                            number: 1,
                            symbol: "DOGE",
                            name: "Dogecoin",
                            icon: coinImages["DOGE"][0],
                            isIncrement: ((coinPrices["DOGE"][1]) >= 0),
                            rate: `${formatNum(coinPrices["DOGE"][1])}%`,
                        }, {
                            number: 2,
                            symbol: "ADA",
                            name: "Cardano",
                            icon: coinImages["ADA"][0],
                            isIncrement: ((coinPrices["ADA"][1]) >= 0),
                            rate: `${formatNum(coinPrices["ADA"][1])}%`,
                        }, {
                            number: 3,
                            symbol: "MATIC",
                            name: "Polygon",
                            icon: coinImages["MATIC"][0],
                            isIncrement: ((coinPrices["MATIC"][1]) >= 0),
                            rate: `${formatNum(coinPrices["MATIC"][1])}%`,
                        },
                        ]} />
                </div>
            ) : (
                <div className={styles.flexCenter}>
                <TrendingCard title='Trending' icon={fire} trendingData={initialData} />
                <TrendingCard title='Biggest Gainers' icon={gainers} trendingData={initialData} />
                <TrendingCard title='Recently Added' icon={recent} trendingData={initialData} />
            </div>
            )}
        </div>
    </div>
}

export default Trending