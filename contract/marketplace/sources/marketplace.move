// Copyright (c) Sui Foundation, Inc.
// SPDX-License-Identifier: Apache-2.0

// Modified from https://github.com/MystenLabs/sui/blob/main/sui_programmability/examples/nfts/sources/marketplace.move

// https://suiscan.xyz/devnet/object/0xcfb9585afb821567a4453d7e5566c0a9f74a14f7ede79640ad3900b28b385389/contracts

module marketplace::marketplace {
    use sui::bag::{Bag, Self};
    use sui::sui::SUI;
    use sui::dynamic_object_field as ofield;
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, ID, UID};
    use sui::coin::{Self, Coin};
    use sui::table::{Table, Self};
    use sui::transfer;

    /// For when amount paid does not match the expected.
    const EAmountIncorrect: u64 = 0;
    /// For when someone tries to delist without ownership.
    const ENotOwner: u64 = 1;
    const EFeeNotEnough: u64 = 2;
    const ETokenPriceLow: u64 = 3;

    /// A shared `Marketplace`. Can be created by anyone using the
    /// `create` function. One instance of `Marketplace` accepts
    /// only one type of Coin - `COIN` for all its listings.
    public struct Marketplace<phantom COIN> has key {
        id: UID,
        owner: address,
        fee_ratio: u64,
        items: Bag,
        payments: Table<address, Coin<COIN>>
    }

    /// A single listing which contains the listed item and its
    /// price in [`Coin<COIN>`].
    public struct Listing has key, store {
        id: UID,
        src_price: u64,
        owner: address,
    }

    /// Create a new shared Marketplace.
    public fun create<COIN>(fee_ratio: u64, ctx: &mut TxContext) {
        let id = object::new(ctx);
        let items = bag::new(ctx);
        let payments = table::new<address, Coin<COIN>>(ctx);
        let owner = tx_context::sender(ctx);
        transfer::share_object(Marketplace<COIN> {
            id,
            owner,
            fee_ratio,
            items,
            payments
        })
    }

    fun deduct_fee<COIN>(
        marketplace: &mut Marketplace<COIN>,
        fee: &mut Coin<SUI>,
        src_price: u64,
        ctx: &mut TxContext
    ) {
        assert!(src_price >= 10_000_000, EFeeNotEnough);
        let market_fee = src_price * marketplace.fee_ratio / 100;
        assert!(market_fee <= coin::value(fee), EFeeNotEnough);

        let remaining_amount: u64 = coin::value(fee) - market_fee;
        let remaining_coin = coin::split(fee, remaining_amount, ctx);
        let fee_coin = coin::split(fee, market_fee, ctx);

        coin::join(fee, remaining_coin);
        transfer::public_transfer(fee_coin, marketplace.owner);
    }

    /// List an item at the Marketplace.
    public fun list<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item: T,
        src_price: u64,
        fee: &mut Coin<SUI>,
        ctx: &mut TxContext
    ) {
        deduct_fee(marketplace, fee, src_price, ctx);
        let item_id = object::id(&item);
        let owner = tx_context::sender(ctx);
        let mut listing = Listing {
            src_price,
            id: object::new(ctx),
            owner
        };

        ofield::add(&mut listing.id, true, item);
        bag::add(&mut marketplace.items, item_id, listing)
    }

    /// Internal function to remove listing and get an item back. Only owner can do that.
    fun delist<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item_id: ID,
        ctx: &TxContext
    ): T {
        let Listing {
            mut id,
            owner,
            src_price: _,
        } = bag::remove(&mut marketplace.items, item_id);

        assert!(tx_context::sender(ctx) == owner, ENotOwner);

        let item = ofield::remove(&mut id, true);
        object::delete(id);
        item
    }

    /// Call [`delist`] and transfer item to the sender.
    public fun delist_and_take<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item_id: ID,
        ctx: &mut TxContext
    ) {
        let item = delist<T, COIN>(marketplace, item_id, ctx);
        transfer::public_transfer(item, tx_context::sender(ctx));
    }

    /// Internal function to purchase an item using a known Listing. Payment is done in Coin<C>.
    /// Amount paid must match the requested amount. If conditions are met,
    /// owner of the item gets the payment and buyer receives their item.
    fun buy<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item_id: ID,
        paid: &mut Coin<COIN>,
        fee: &mut Coin<SUI>,
        ctx: &mut TxContext
    ): T {
        let Listing {
            mut id,
            owner,
            src_price ,
        } = bag::remove(&mut marketplace.items, item_id);

        deduct_fee(marketplace, fee, src_price, ctx);
        assert!(src_price <= coin::value(paid), EAmountIncorrect);

        let change_amount: u64 = coin::value(paid) - src_price;
        let change_coin = coin::split(paid, change_amount, ctx);
        let paid_coin = coin::split(paid, src_price, ctx);

        coin::join(paid, change_coin);
        transfer::public_transfer(paid_coin, owner);

        let item = ofield::remove(&mut id, true);
        object::delete(id);
        item
    }

    /// Call [`buy`] and transfer item to the sender.
    public fun buy_and_take<T: key + store, COIN>(
        marketplace: &mut Marketplace<COIN>,
        item_id: ID,
        paid: &mut Coin<COIN>,
        fee: &mut Coin<SUI>,
        ctx: &mut TxContext
    ) {
        transfer::public_transfer(
            buy<T, COIN>(marketplace, item_id, paid, fee, ctx),
            tx_context::sender(ctx)
        )
    }

    /// Internal function to take profits from selling items on the `Marketplace`.
    fun take_profits<COIN>(
        marketplace: &mut Marketplace<COIN>,
        ctx: &TxContext
    ): Coin<COIN> {
        table::remove<address, Coin<COIN>>(&mut marketplace.payments, tx_context::sender(ctx))
    }

    #[lint_allow(self_transfer)]
    /// Call [`take_profits`] and transfer Coin object to the sender.
    public fun take_profits_and_keep<COIN>(
        marketplace: &mut Marketplace<COIN>,
        ctx: &mut TxContext
    ) {
        transfer::public_transfer(
            take_profits(marketplace, ctx),
            tx_context::sender(ctx)
        )
    }


}