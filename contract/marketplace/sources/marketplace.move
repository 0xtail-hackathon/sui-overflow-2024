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
    use std::vector;
    use sui::transfer;

    /// For when amount paid does not match the expected.
    const EAmountIncorrect: u64 = 0;
    /// For when someone tries to delist without ownership.
    const ENotOwner: u64 = 1;
    const EFeeNotEnough: u64 = 2;
    const ETokenPriceLow: u64 = 3;
    const EInvalidBuying: u64 = 4;

    /// A shared `Marketplace`. Can be created by anyone using the
    /// `create` function. One instance of `Marketplace` accepts
    /// only one type of Coin - `COIN` for all its listings.
    public struct Marketplace has key {
        id: UID,
        owner: address,
        fee_ratio: u64,
        items: Bag,
        item_list: vector<ListMeta>
    }

    /// A single listing which contains the listed item and its
    /// price in [`Coin<COIN>`].
    public struct Listing has key, store {
        id: UID,
        deal_coin: ID,
        deal_amount: u64,
        owner: address,
        offer_type: u64 // offer_type "1" is sell / "2" is buy
    }

    public struct ListMeta has store, copy, drop {
        id: ID,
        deal_owner: address,
        deal_coin: ID,
        deal_amount: u64,
    }

    /// Create a new shared Marketplace.
    public fun create(fee_ratio: u64, ctx: &mut TxContext) {
        let id = object::new(ctx);
        let items = bag::new(ctx);
        let owner = tx_context::sender(ctx);

        transfer::share_object(Marketplace {
            id,
            owner,
            fee_ratio,
            items,
            item_list: vector::empty<ListMeta>(),
        })
    }

    /// List an item at the Marketplace.
    public fun list<T: key + store>(
        marketplace: &mut Marketplace,
        item: T,
        deal_coin: ID,
        deal_amount: u64,
        fee: &mut Coin<SUI>,
        offer_type: u64,
        ctx: &mut TxContext
    ) {
        deduct_fee(marketplace, fee, deal_amount, ctx);

        let item_id = object::id(&item);
        let owner = tx_context::sender(ctx);
        let mut listing = Listing {
            id: object::new(ctx),
            deal_coin,
            deal_amount,
            owner,
            offer_type,
        };

        let mut list_meta = ListMeta {
            id: item_id,
            deal_owner: owner,
            deal_coin,
            deal_amount,
        };

        add_item_list(marketplace, list_meta);
        ofield::add(&mut listing.id, true, item);
        bag::add(&mut marketplace.items, item_id, listing)
    }

    /// Internal function to remove listing and get an item back. Only owner can do that.
    fun delist<T: key + store>(
        marketplace: &mut Marketplace,
        item_id: ID,
        ctx: &TxContext
    ): T {
        let Listing {
            mut id,
            owner,
            deal_coin: _,
            deal_amount: _,
            offer_type: _,
        } = bag::remove(&mut marketplace.items, item_id);

        assert!(tx_context::sender(ctx) == owner, ENotOwner);
        let item = ofield::remove(&mut id, true);
        object::delete(id);
        remove_item_list(marketplace, item_id);

        item
    }

    /// Call [`delist`] and transfer item to the sender.
    public fun delist_and_take<T: key + store>(
        marketplace: &mut Marketplace,
        item_id: ID,
        ctx: &mut TxContext
    ) {
        let item = delist<T>(marketplace, item_id, ctx);
        transfer::public_transfer(item, tx_context::sender(ctx));
    }

    /// Internal function to purchase an item using a known Listing. Payment is done in Coin<C>.
    /// Amount paid must match the requested amount. If conditions are met,
    /// owner of the item gets the payment and buyer receives their item.
    fun buy<T: key + store, K>(
        marketplace: &mut Marketplace,
        item_id: ID,
        paid: &mut Coin<K>,
        fee: &mut Coin<SUI>,
        ctx: &mut TxContext
    ): T {
        let Listing {
            mut id,
            owner,
            deal_coin,
            deal_amount ,
            offer_type,
        } = bag::remove(&mut marketplace.items, item_id);

        assert!(owner != tx_context::sender(ctx), EInvalidBuying);
        assert!(deal_amount <= coin::value(paid), EAmountIncorrect);

        deduct_fee(marketplace, fee, deal_amount, ctx);
        let change_amount: u64 = coin::value(paid) - deal_amount;
        let change_coin = coin::split(paid, change_amount, ctx);
        let paid_coin = coin::split(paid, deal_amount, ctx);

        coin::join(paid, change_coin);
        transfer::public_transfer(paid_coin, owner);

        let item = ofield::remove(&mut id, true);
        object::delete(id);
        remove_item_list(marketplace, item_id);

        item
    }

    /// Call [`buy`] and transfer item to the sender.
    public fun buy_and_take<T: key + store, K>(
        marketplace: &mut Marketplace,
        item_id: ID,
        paid: &mut Coin<K>,
        fee: &mut Coin<SUI>,
        ctx: &mut TxContext
    ) {
        transfer::public_transfer(
            buy<T, K>(marketplace, item_id, paid, fee, ctx),
            tx_context::sender(ctx)
        )
    }

    fun deduct_fee(
        marketplace: &mut Marketplace,
        fee: &mut Coin<SUI>,
        deal_amount: u64,
        ctx: &mut TxContext
    ) {
        let market_fee = deal_amount * marketplace.fee_ratio / 100;
        assert!(market_fee <= coin::value(fee), EFeeNotEnough);

        let remaining_amount: u64 = coin::value(fee) - market_fee;
        let remaining_coin = coin::split(fee, remaining_amount, ctx);
        let fee_coin = coin::split(fee, market_fee, ctx);

        coin::join(fee, remaining_coin);
        transfer::public_transfer(fee_coin, marketplace.owner);
    }

    fun add_item_list(marketplace: &mut Marketplace, item_id: ListMeta) {
        vector::push_back<ListMeta>(&mut marketplace.item_list, item_id);
    }

    fun remove_item_list(marketplace: &mut Marketplace, item_id: ID) {
        let length = vector::length(&marketplace.item_list);
        let mut i = 0;
        while (i < length) {
            let item = vector::borrow_mut(&mut marketplace.item_list, i);
            if (item.id == item_id) {
                vector::remove(&mut marketplace.item_list, i);
                break
            };
            i = i + 1;
        }
    }

}