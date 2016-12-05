import {Observable} from "rxjs";
import {replaceItem} from "./helpers";


interface ShopItem {
    name: string;
    productionPerSecond: number;
    initialCost: number;
    currentCost: number;
    boughtCount: number;
    costIncreaseFactor: number;
    readonly id: string;
}

interface State {
    cookiesCount: number;
    shop: {
        items: ShopItem[];
    };
}

type Reducer = (state: State) => State;

interface SourceWithState {
    state: Observable<State>;
}

export function getShopItemIndex(state: State, id: string): number {
    return state.shop.items.findIndex(item => item.id == id);
}

export function getShopItemByIndex(state: State, index: number): ShopItem {
    return state.shop.items[index];
}

export function increaseItemBoughts (item: ShopItem): ShopItem {
    return Object.assign({}, item, {
        currentCost: Math.ceil(item.currentCost * item.costIncreaseFactor),
        boughtCount: item.boughtCount + 1,
    });
}

export function itemProduceCookies (item: ShopItem): number {
    return item.productionPerSecond * item.boughtCount;
}

export function buyShopItem (previousState: State, id: string): State {
    const itemIndex = getShopItemIndex(previousState, id);
    const item = getShopItemByIndex(previousState, itemIndex);

    const canBuy = previousState.cookiesCount >=  item.currentCost;
    const cookiesCount = canBuy ? previousState.cookiesCount - item.currentCost : previousState.cookiesCount;
    const newItem = canBuy ? increaseItemBoughts(item) : item;

    return state(cookiesCount, replaceItem(previousState.shop.items, newItem, itemIndex));
}

function state (cookiesCount: number, shopItems: ShopItem[]): State {
    return {
        cookiesCount,
        shop: {
            items: shopItems,
        },
    };
}

function makeStateDriver (initialState: State) {
    return (input$: Observable<Reducer>) => {
        return input$
            .scan((state, changeState) => changeState(state), initialState)
            .startWith(initialState);
    };
}

export { State, ShopItem, Reducer, SourceWithState, state, makeStateDriver };
