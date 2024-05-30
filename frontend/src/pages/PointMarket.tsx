import React from 'react';

// import React, { useState } from "react";
// import { TransactionBlock } from "@mysten/sui.js/transactions";
// import { addressEllipsis, ConnectButton, useWallet } from "@suiet/wallet-kit";
// import "@suiet/wallet-kit/style.css";
//
//
// function makeSellOffer() {
// 	const txb = new TransactionBlock();
//
// 	const contractAddress = "0xae636d4fcbc298aac86f42df99ad5bd7effc551991a53b71a2f588090d7117d3";
// 	const contractModule = "marketplace";
// 	const contractMethod = "list";
//
// 	const marketId = "0x0a407538e81bbd606b88ac206a926472f5c0e14fd5c0f3af07861e7e4328543f";
// 	const item = "0x5f5d4cdc0e60661cfc587afcf889fd03265a377711d457d0bb9893b551d2dc9e";
// 	const itemContractAddress = "0x58643225dab4e028d600b1b89d89fa613c4a0769d158fdaaf04d596055584a65";
//
// 	const src_amount = 100000;
// 	const src_price = 1000000000;
// 	const fee = "0xa64485282966f10fb488c71dce202513bdc60c8e6f8e6db89b95bd8f4eb99ae8";
//
//
// 	txb.moveCall({
// 		target: `${contractAddress}::${contractModule}::${contractMethod}`,
// 		typeArguments: [
// 			`0x2::coin::Coin<${itemContractAddress}::managed::MANAGED>`,
// 			"0x2::sui::SUI",
// 		],
// 		arguments: [
// 			txb.object(marketId),
// 			txb.object(item),
// 			txb.pure(src_price),
// 			txb.object(fee),
// 		]
// 	});
//
// 	return txb;
// }
//
// function makeBuyOffer(gasCoinForToken: string, gasCoinForFee: string) {
// 	const txb = new TransactionBlock();
//
// 	const contractAddress = "0xae636d4fcbc298aac86f42df99ad5bd7effc551991a53b71a2f588090d7117d3";
// 	const contractModule = "marketplace";
// 	const contractMethod = "buy_and_take";
//
// 	const marketId = "0x0a407538e81bbd606b88ac206a926472f5c0e14fd5c0f3af07861e7e4328543f";
// 	const item = "0x68f117baefb27d575639d40a17b323f097e5c55066e3ceb8946cab308c747d0e";
// 	const itemContractAddress = "0x58643225dab4e028d600b1b89d89fa613c4a0769d158fdaaf04d596055584a65";
// 	console.log(txb.gas);
//
// 	txb.moveCall({
// 		target: `${contractAddress}::${contractModule}::${contractMethod}`,
// 		typeArguments: [
// 			`0x2::coin::Coin<${itemContractAddress}::managed::MANAGED>`,
// 			"0x2::sui::SUI",
// 		],
// 		arguments: [
// 			txb.object(marketId),         // MARKET_ID
// 			txb.pure(item),             // ITEM_ID
// 			txb.object(gasCoinForToken),  // BUYER_TOKEN_PAID_OBJECT
// 			txb.object(gasCoinForFee),    // BUYER_FEE_PAID_OBJECT
// 		],
// 	});
//
// 	// Logging for debugging
// 	console.log("Transaction Block:", txb);
// 	console.log("Market ID:", marketId);
// 	console.log("Item ID:", item);
// 	console.log("Gas Coin for Token:", gasCoinForToken);
// 	console.log("Gas Coin for Fee:", gasCoinForFee);
//
// 	return txb;
// }
//
const PointMarket: React.FC = () => {
	return (
		<div>
			<h1>Point Market</h1>
			<p>Welcome to the Point Market page!</p>
		</div>
	);
};
// 	const wallet = useWallet();
// 	const [mintResult, setMintResult] = useState<any>(null);
// 	const [userAssets, setUserAssets] = useState<any>(null);
// 	const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null);
// 	const [transactionResult, setTransactionResult] = useState(null);
//
//
// 	async function sellOffer() {
// 		if (!wallet.connected) {
// 			console.error('Wallet is not connected.');
// 			return;
// 		}
// 		const txb = makeSellOffer();
// 		try {
// 			console.log('Executing transaction block...');
// 			console.log(txb);
// 			const res = await wallet.signAndExecuteTransactionBlock({
// 				transactionBlock: txb
// 			});
// 			console.log("sell offer made successfully!", res);
// 			alert("Congrats! sell offer is made!");
// 			setTransactionResult(res); // Update the state with the transaction result
// 			setMintResult(res);
// 		} catch (e) {
// 			alert("Oops, sell offer failed");
// 			console.error("sell offer failed", e);
// 		}
// 	}
//
// 	function getUserAssets(owner: string) {
// 		fetch('https://sui-devnet.blockeden.xyz/9ib8BrdidJqejt8L86bT', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({
// 				jsonrpc: '2.0',
// 				id: 1,
// 				method: 'suix_getAllBalances',
// 				params: [owner]
// 			})
// 		})
// 			.then(response => {
// 				if (!response.ok) {
// 					throw new Error('Network response was not ok');
// 				}
// 				return response.json();
// 			})
// 			.then(data => {
// 				setUserAssets(data.result);
// 			})
// 			.catch(error => {
// 				console.error('There was a problem with your fetch operation:', error);
// 			});
// 	}
//
// 	async function buyOffer(buyer, tokenPrice, fee) {
// 		if (!wallet.connected) {
// 			console.error('Wallet is not connected.');
// 			return;
// 		}
//
// 		// Replace with your actual API call and response handling
// 		const response = await fetch('https://sui-devnet.blockeden.xyz/9ib8BrdidJqejt8L86bT', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({
// 				"jsonrpc": "2.0",
// 				"id": 1,
// 				"method": "suix_getAllCoins",
// 				"params": [
// 					buyer,
// 					null,
// 					10
// 				]
// 			})
// 		});
//
// 		const data = await response.json();
// 		const coins = data.result.data;
// 		console.log("coins: ", coins);
//
// 		let gasCoinForToken = null;
// 		let gasCoinForFee = null;
//
// 		// Find a coin with balance greater than tokenPrice
// 		for (const coin of coins) {
// 			if (parseInt(coin.balance) > tokenPrice) {
// 				gasCoinForToken = coin.coinObjectId;
// 				break;
// 			}
// 		}
//
// 		// Find a different coin with balance greater than fee
// 		for (const coin of coins) {
// 			if (parseInt(coin.balance) > fee) {
// 				if (coin.coinObjectId !== gasCoinForToken) {
// 					gasCoinForFee = coin.coinObjectId;
// 					break;
// 				}
// 			}
// 		}
//
// 		// If no different coin was found, attempt to find a coin that covers both tokenPrice and fee
// 		if (!gasCoinForFee) {
// 			for (const coin of coins) {
// 				if (parseInt(coin.balance) > (tokenPrice + fee)) {
// 					gasCoinForFee = coin.coinObjectId;
// 					break;
// 				}
// 			}
// 		}
//
// 		// If gasCoinForToken and gasCoinForFee are not assigned, handle the error appropriately
// 		if (!gasCoinForToken || !gasCoinForFee) {
// 			console.error('Insufficient balance for either token purchase or fee.');
// 			alert('Insufficient balance for either token purchase or fee.');
// 			return;
// 		}
//
// 		console.log("gasCoinForFee: ", gasCoinForFee);
// 		console.log("gasCoinForToken: ", gasCoinForToken);
// 		const txb = makeBuyOffer(gasCoinForToken, gasCoinForFee);
//
// 		try {
// 			console.log('Executing transaction block...');
// 			console.log(txb);
// 			const res = await wallet.signAndExecuteTransactionBlock({
// 				transactionBlock: txb
// 			});
// 			console.log("Sell offer made successfully!", res);
// 			alert("Congrats! Sell offer is made!");
// 			setMintResult(res);
// 		} catch (e) {
// 			alert("Oops, sell offer failed");
// 			console.error("Sell offer failed", e);
// 		}
// 	}
//
// 	return (
// 		<div className="App">
// 			<h1 className="title gradient">Hello, Suiet Wallet Kit</h1>
// 			<ConnectButton />
//
// 			<section>
// 				<p>
// 					<span className="gradient">Wallet status:</span> {wallet.status}
// 				</p>
// 				{wallet.status === "connected" && (
// 					<>
// 						{wallet?.account && (
// 							<>
// 								<p>
// 									<span className="gradient">Connected Account: </span>
// 									{wallet.account.address}
// 								</p>
// 								<p>
//                                     <span className="gradient">
//                                         Connected Account (with ellipsis):{" "}
//                                     </span>
// 									{addressEllipsis(wallet.account.address)}
// 								</p>
// 							</>
// 						)}
// 						<p>
// 							<span className="gradient">Current chain of wallet: </span>
// 							{wallet.chain?.name}
// 						</p>
// 						<button onClick={() => getUserAssets(wallet.account.address)}> Get Assets </button>
//
// 						{userAssets && (
// 							<div>
// 								<select
// 									onChange={(e) => setSelectedAssetIndex(Number(e.target.value))}
// 									value={selectedAssetIndex !== null ? selectedAssetIndex : ''}
// 								>
// 									<option value="" disabled>Select an asset</option>
// 									{userAssets.map((asset: any, index: number) => (
// 										<option key={index} value={index}>
// 											{asset.coinType} - {asset.totalBalance}
// 										</option>
// 									))}
// 								</select>
// 								{/*{selectedAssetIndex !== null && (*/}
// 								{/*    <div>*/}
// 								{/*        <h3>Selected Asset Details</h3>*/}
// 								{/*        <pre>{JSON.stringify(userAssets[selectedAssetIndex], null, 2)}</pre>*/}
// 								{/*    </div>*/}
// 								{/*)}*/}
// 							</div>
// 						)}
//
// 						<div>
// 							<button onClick={sellOffer}>Make sell offer!</button>
// 							{transactionResult && (
// 								<div>
// 									<h3>Transaction Result:</h3>
// 									<pre>{JSON.stringify(transactionResult, null, 2)}</pre>
// 								</div>
// 							)}
// 						</div>
// 						<button onClick={() => buyOffer(wallet.account?.address, 1000000000, 10000000)}>Buy token</button>
// 					</>
// 				)}
// 			</section>
// 		</div>
// 	);
// };
//
export default PointMarket;
