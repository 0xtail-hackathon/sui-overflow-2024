import React, { useState } from "react";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { addressEllipsis, ConnectButton, useWallet } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

function createMintNftTxnBlock() {
	const txb = new TransactionBlock();

	const contractAddress = "0x3c2c4f8f78d63dc3a7600caf7a35cbecec233ef78eae2c4c0803eb23b8a2a17e";
	const contractModule = "my_hero";
	const contractMethod = "mint";

	const nftName = "NFT";
	const nftImgUrl =
		"https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4";
	const nftDescription = "nft 240525";
	const nftCreator = "Dara";

	txb.moveCall({
		target: `${contractAddress}::${contractModule}::${contractMethod}`,
		arguments: [txb.pure(nftName), txb.pure(nftImgUrl), txb.pure(nftDescription), txb.pure(nftCreator)],
	});
	return txb;
}

function makeSellOffer() {
	const txb = new TransactionBlock();

	const contractAddress = "0xae636d4fcbc298aac86f42df99ad5bd7effc551991a53b71a2f588090d7117d3";
	const contractModule = "marketplace";
	const contractMethod = "list";

	const marketId = "0x0a407538e81bbd606b88ac206a926472f5c0e14fd5c0f3af07861e7e4328543f";
	const item = "0x0e14252abbdc7dad7c22da9395a52997110e328093ec414a432da8e7a613fa75";
	const itemContractAddress = "0x58643225dab4e028d600b1b89d89fa613c4a0769d158fdaaf04d596055584a65";

	const src_amount = 100000;
	const src_price = 1000000000;
	const fee = "0x0b48e3336ffbc177edd13df92d47d09dc5c720b1f7aae924c873c51a5c51e91d";

	txb.moveCall({
		target: `${contractAddress}::${contractModule}::${contractMethod}`,
		typeArguments: [`0x2::coin::Coin<${itemContractAddress}::managed::MANAGED>`, "0x2::sui::SUI"],
		arguments: [txb.object(marketId), txb.object(item), txb.pure(src_amount), txb.pure(src_price), txb.object(fee)],
	});
	return txb;
}

function makeBuyOffer(gasCoinForToken: string, gasCoinForFee: string) {
	const txb = new TransactionBlock();

	const contractAddress = "0xae636d4fcbc298aac86f42df99ad5bd7effc551991a53b71a2f588090d7117d3";
	const contractModule = "marketplace";
	const contractMethod = "buy_and_take";

	const marketId = "0x0a407538e81bbd606b88ac206a926472f5c0e14fd5c0f3af07861e7e4328543f";
	const item = "0x0e14252abbdc7dad7c22da9395a52997110e328093ec414a432da8e7a613fa75";
	const itemContractAddress = "0x58643225dab4e028d600b1b89d89fa613c4a0769d158fdaaf04d596055584a65";
	console.log(txb.gas);

	txb.moveCall({
		target: `${contractAddress}::${contractModule}::${contractMethod}`,
		typeArguments: [`0x2::coin::Coin<${itemContractAddress}::managed::MANAGED>`, "0x2::sui::SUI"],
		arguments: [
			txb.object(marketId), // MARKET_ID
			txb.pure(item), // ITEM_ID
			txb.object(gasCoinForToken), // BUYER_TOKEN_PAID_OBJECT
			txb.object(gasCoinForFee), // BUYER_FEE_PAID_OBJECT
		],
	});

	// Logging for debugging
	console.log("Transaction Block:", txb);
	console.log("Market ID:", marketId);
	console.log("Item ID:", item);
	console.log("Gas Coin for Token:", gasCoinForToken);
	console.log("Gas Coin for Fee:", gasCoinForFee);

	return txb;
}

const PointMarket: React.FC = () => {
	const wallet = useWallet();
	const [mintResult, setMintResult] = useState<any>(null);
	const [userAssets, setUserAssets] = useState<any>(null);
	const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null);
	const [transactionResult, setTransactionResult] = useState(null);

	async function mintNft() {
		if (!wallet.connected) return;

		const txb = createMintNftTxnBlock();
		try {
			const res = await wallet.signAndExecuteTransactionBlock({
				transactionBlock: txb,
			});
			console.log("nft minted successfully!", res);
			alert("Congrats! your nft is minted!");
			setMintResult(res);
		} catch (e) {
			alert("Oops, nft minting failed");
			console.error("nft mint failed", e);
		}
	}

	async function sellOffer() {
		if (!wallet.connected) {
			console.error("Wallet is not connected.");
			return;
		}
		const txb = makeSellOffer();
		try {
			console.log("Executing transaction block...");
			console.log(txb);
			const res = await wallet.signAndExecuteTransactionBlock({
				transactionBlock: txb,
			});
			console.log("sell offer made successfully!", res);
			alert("Congrats! sell offer is made!");
			setTransactionResult(res); // Update the state with the transaction result
			setMintResult(res);
		} catch (e) {
			alert("Oops, sell offer failed");
			console.error("sell offer failed", e);
		}
	}

	function getUserAssets(owner: string) {
		fetch("https://sui-devnet.blockeden.xyz/9ib8BrdidJqejt8L86bT", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method: "suix_getAllBalances",
				params: [owner],
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setUserAssets(data.result);
			})
			.catch((error) => {
				console.error("There was a problem with your fetch operation:", error);
			});
	}

	async function buyOffer(buyer, tokenPrice, fee) {
		if (!wallet.connected) {
			console.error("Wallet is not connected.");
			return;
		}

		// Replace with your actual API call and response handling
		const response = await fetch("https://sui-devnet.blockeden.xyz/9ib8BrdidJqejt8L86bT", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method: "suix_getAllCoins",
				params: [buyer, null, 10],
			}),
		});

		const data = await response.json();
		const coins = data.result.data;
		console.log("coins: ", coins);

		let gasCoinForToken = null;
		let gasCoinForFee = null;

		// Find a coin with balance greater than tokenPrice
		for (const coin of coins) {
			if (parseInt(coin.balance) > tokenPrice) {
				gasCoinForToken = coin.coinObjectId;
				break;
			}
		}

		// Find a different coin with balance greater than fee
		for (const coin of coins) {
			if (parseInt(coin.balance) > fee) {
				if (coin.coinObjectId !== gasCoinForToken) {
					gasCoinForFee = coin.coinObjectId;
					break;
				}
			}
		}

		// If no different coin was found, attempt to find a coin that covers both tokenPrice and fee
		if (!gasCoinForFee) {
			for (const coin of coins) {
				if (parseInt(coin.balance) > tokenPrice + fee) {
					gasCoinForFee = coin.coinObjectId;
					break;
				}
			}
		}

		// If gasCoinForToken and gasCoinForFee are not assigned, handle the error appropriately
		if (!gasCoinForToken || !gasCoinForFee) {
			console.error("Insufficient balance for either token purchase or fee.");
			alert("Insufficient balance for either token purchase or fee.");
			return;
		}

		console.log("gasCoinForFee: ", gasCoinForFee);
		console.log("gasCoinForToken: ", gasCoinForToken);
		const txb = makeBuyOffer(gasCoinForToken, gasCoinForFee);

		try {
			console.log("Executing transaction block...");
			console.log(txb);
			const res = await wallet.signAndExecuteTransactionBlock({
				transactionBlock: txb,
			});
			console.log("Sell offer made successfully!", res);
			alert("Congrats! Sell offer is made!");
			setMintResult(res);
		} catch (e) {
			alert("Oops, sell offer failed");
			console.error("Sell offer failed", e);
		}
	}

	return (
		<div className="App">
			<h1 className="title gradient">Hello, Suiet Wallet Kit</h1>
			<ConnectButton />

			<section>
				<p>
					<span className="gradient">Wallet status:</span> {wallet.status}
				</p>
				{wallet.status === "connected" && (
					<>
						{wallet?.account && (
							<>
								<p>
									<span className="gradient">Connected Account: </span>
									{wallet.account.address}
								</p>
								<p>
									<span className="gradient">Connected Account (with ellipsis): </span>
									{addressEllipsis(wallet.account.address)}
								</p>
							</>
						)}
						<p>
							<span className="gradient">Current chain of wallet: </span>
							{wallet.chain?.name}
						</p>
						<button onClick={() => getUserAssets(wallet.account.address)}> Get Assets </button>

						{userAssets && (
							<div>
								<select
									onChange={(e) => setSelectedAssetIndex(Number(e.target.value))}
									value={selectedAssetIndex !== null ? selectedAssetIndex : ""}
								>
									<option value="" disabled>
										Select an asset
									</option>
									{userAssets.map((asset: any, index: number) => (
										<option key={index} value={index}>
											{asset.coinType} - {asset.totalBalance}
										</option>
									))}
								</select>
								{/*{selectedAssetIndex !== null && (*/}
								{/*    <div>*/}
								{/*        <h3>Selected Asset Details</h3>*/}
								{/*        <pre>{JSON.stringify(userAssets[selectedAssetIndex], null, 2)}</pre>*/}
								{/*    </div>*/}
								{/*)}*/}
							</div>
						)}

						<button onClick={mintNft}> Mint Your NFT !</button>
						{mintResult && (
							<div>
								<h2>Minting Result</h2>
								<pre>{JSON.stringify(mintResult, null, 2)}</pre>
								<a href={`https://suiscan.xyz/testnet/tx/${mintResult.digest}`}>View Transaction from Scan</a>
							</div>
						)}
						<div>
							<button onClick={sellOffer}>Make sell offer!</button>
							{transactionResult && (
								<div>
									<h3>Transaction Result:</h3>
									<pre>{JSON.stringify(transactionResult, null, 2)}</pre>
								</div>
							)}
						</div>
						<button onClick={() => buyOffer(wallet.account?.address, 1000000000, 10000000)}>Buy token</button>
					</>
				)}
			</section>
		</div>
	);
};

export default PointMarket;

/*
참고용: 배포한 contract 내용(0x3c2c4f8f78d63dc3a7600caf7a35cbecec233ef78eae2c4c0803eb23b8a2a17e)
module nft_demo::my_hero {
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use sui::transfer;
    use sui::object::{Self, UID};

    use sui::package;
    use sui::display;

    struct Hero has key, store {
        id: UID,
        name: String,
        img_url: String,
        description: String,
        creator: String
    }

    /// One-Time-Witness for the module.
    /// must drop and same as module name but capitalize
    struct MY_HERO has drop {}

    fun init(otw: MY_HERO, ctx: &mut TxContext) {
        let keys = vector[
            string::utf8(b"name"),
            string::utf8(b"link"),
            string::utf8(b"image_url"),
            string::utf8(b"description"),
            string::utf8(b"project_url"),
            string::utf8(b"creator"),
        ];

        let values = vector[
            // For `name` we can use the `Hero.name` property
            string::utf8(b"{name}"),
            // For `link` we can build a URL using an `id` property
            string::utf8(b"https://sui-heroes.io/hero/{id}"),
            // For `image_url` we use an ipfs :// + `img_url` or https:// + `img_url`.
            string::utf8(b"{img_url}"),
            // Description is static for all `Hero` objects.
            string::utf8(b"{description}"),
            // Project URL is usually static
            string::utf8(b"https://sui-heroes.io"),
            // Creator field can be any
            string::utf8(b"{creator}")
        ];

        // Claim the `Publisher` for the package!
        let publisher = package::claim(otw, ctx);

        // Get a new `Display` object for the `Hero` type.
        let display = display::new_with_fields<Hero>(
            &publisher, keys, values, ctx
        );

        // Commit first version of `Display` to apply changes.
        display::update_version(&mut display);

        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(display, tx_context::sender(ctx));
    }

    /// Anyone can mint their `Hero`!
    public entry fun mint(
        name: String,
        img_url: String,
        description: String,
        creator: String,
        ctx: &mut TxContext
    ) {
        let id = object::new(ctx);

        let hero = Hero {
            id,
            name,
            img_url,
            description,
            creator
        };

        transfer::public_transfer(hero, tx_context::sender(ctx));
    }

    /// Permanently delete `nft`
    public entry fun burn(nft: Hero) {
        let Hero {
            id,
            name: _ ,
            img_url: _ ,
            description: _ ,
            creator:_
        } = nft;
        object::delete(id);
    }
}
 */
