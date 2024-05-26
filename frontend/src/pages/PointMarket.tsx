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
    const nftImgUrl = "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4";
    const nftDescription = "nft 240525";
    const nftCreator = "Dara";

    txb.moveCall({
        target: `${contractAddress}::${contractModule}::${contractMethod}`,
        arguments: [
            txb.pure(nftName),
            txb.pure(nftImgUrl),
            txb.pure(nftDescription),
            txb.pure(nftCreator)
        ]
    });
    return txb;
}

const PointMarket: React.FC = () => {
    const wallet = useWallet();
    const [mintResult, setMintResult] = useState<any>(null);
    const [userAssets, setUserAssets] = useState<any>(null);
    const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null);

    async function mintNft() {
        if (!wallet.connected) return;

        const txb = createMintNftTxnBlock();
        try {
            const res = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: txb
            });
            console.log("nft minted successfully!", res);
            alert("Congrats! your nft is minted!");
            setMintResult(res);
        } catch (e) {
            alert("Oops, nft minting failed");
            console.error("nft mint failed", e);
        }
    }

    function getUserAssets(owner: string) {
        fetch('https://sui-devnet.blockeden.xyz/9ib8BrdidJqejt8L86bT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'suix_getAllBalances',
                params: [owner]
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserAssets(data.result);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
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
                                    <span className="gradient">
                                        Connected Account (with ellipsis):{" "}
                                    </span>
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
                                    value={selectedAssetIndex !== null ? selectedAssetIndex : ''}
                                >
                                    <option value="" disabled>Select an asset</option>
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
                                <a href={`https://suiscan.xyz/testnet/tx/${mintResult.digest}`}>
                                    View Transaction from Scan
                                </a>
                            </div>
                        )}
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