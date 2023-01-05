const main = async () => {
  // console.log('f')
  // const bitcoinFactory = await hre.ethers.getContractFactory('Bitcoin')
  // console.log('a')
  // const bitcoinContract = await bitcoinFactory.deploy()
  // console.log('b')
  // await bitcoinContract.deployed()
  // console.log('bitcoin deployed to:', bitcoinContract.address)

  // const BusdFactory = await hre.ethers.getContractFactory('Busd')
  // const BusdContract = await BusdFactory.deploy()
  // await BusdContract.deployed()
  // console.log('Busd deployed to:', BusdContract.address)

  // const cardanoFactory = await hre.ethers.getContractFactory('Cardano')
  // const cardanoContract = await cardanoFactory.deploy()
  // await cardanoContract.deployed()
  // console.log('cardano deployed to:', cardanoContract.address)

  const dogeCoinFactory = await hre.ethers.getContractFactory('DogeCoin')
  const dogeCoinContract = await dogeCoinFactory.deploy()
  await dogeCoinContract.deployed()
  console.log('dogeCoin deployed to:', dogeCoinContract.address)

  const polygonFactory = await hre.ethers.getContractFactory('Polygon')
  const polygonContract = await polygonFactory.deploy()
  await polygonContract.deployed()
  console.log('polygon deployed to:', polygonContract.address)

  const xrpFactory = await hre.ethers.getContractFactory('Xrp')
  const xrpContract = await xrpFactory.deploy()
  await xrpContract.deployed()
  console.log('xrp deployed to:', xrpContract.address)

  const usdtFactory = await hre.ethers.getContractFactory('Usdt')
  const usdtContract = await usdtFactory.deploy()
  await usdtContract.deployed()
  console.log('UsdtToken deployed to:', usdtContract.address)

  const usdcFactory = await hre.ethers.getContractFactory('Usdc')
  const usdcContract = await usdcFactory.deploy()
  await usdcContract.deployed()
  console.log('UsdcToken deployed to:', usdcContract.address)

  // const bnbFactory = await hre.ethers.getContractFactory('Bnb')
  // const bnbContract = await bnbFactory.deploy()
  // await bnbContract.deployed()
  // console.log('BNB deployed to:', bnbContract.address)
}

;(async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
