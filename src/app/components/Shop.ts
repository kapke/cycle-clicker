import {div, span, VNode} from "@cycle/dom";

import {SourceWithDOM} from "../declarations";
import {Component} from "../helpers";
import {itemPurchase} from "../reducers";
import {ShopItem, SourceWithState, State} from "../State";

const {shop, item, name, cost, production, count} = require('./../styles/styles.scss');
const _shop = `.${shop}`;
const _item = `.${item}`;


export function renderItem (shopItem: ShopItem): VNode {
    return div(_item, {attrs: {'data-item': shopItem.id}}, [
        span(`.${count}`, shopItem.boughtCount),
        span(`.${name}`, shopItem.name),
        span(`.${cost}`, shopItem.currentCost),
        span(`.${production}`, shopItem.productionPerSecond),
    ]);
}

export function renderShop (state: State): VNode {
    const shopItems = state.shop.items.map(renderItem);

    return div(_shop, shopItems);
}

export function ShopComponent (sources: SourceWithDOM & SourceWithState) {
    const itemClicks$ = sources.DOM.select(`${_shop} ${_item}`).events('click');
    const itemBoughts$ = itemClicks$
        .pluck('currentTarget')
        .map((itemElement: HTMLElement) => itemElement.getAttribute('data-item'))
        .map(itemPurchase);

    return {
        DOM: sources.state.map(renderShop),
        itemBoughts: itemBoughts$,
    };
}

export const Shop = Component(ShopComponent);
