import {sum} from "./helpers";
import {buyShopItem, itemProduceCookies, Reducer, state, State} from "./State";


export function cookieClick (previousState: State): State {
    return state(previousState.cookiesCount + 1, previousState.shop.items);
}

export function itemPurchase (id: string): Reducer {
    return (previousState: State): State => {
        return buyShopItem(previousState, id);
    };
}

export function produceCookies (previousState: State): State {
    const newCookies = previousState.shop.items
        .map(itemProduceCookies)
        .reduce(sum, previousState.cookiesCount);

    return state(newCookies, previousState.shop.items);
}
