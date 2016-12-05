import {div, VNode} from "@cycle/dom";
import {Observable} from "rxjs";

import {SourceWithDOM} from "../declarations";
import {Component} from "../helpers";
import {produceCookies} from "../reducers";
import {SourceWithState} from "../State";
import {Cookie} from "./Cookie";
import {Shop} from "./Shop";

const { app } = require("./../styles/styles.scss");


function renderApp (cookie: VNode, shop: VNode): VNode {
    return div(`.${app}`, [
        cookie,
        shop,
    ]);
}

export function AppComponent (sources: SourceWithState & SourceWithDOM) {
    const cookie = Cookie(sources);
    const shop = Shop(sources);

    const stateChanges$ = Observable.merge(
        cookie.clickedCookies,
        shop.itemBoughts,
        Observable.interval(1000).map(() => produceCookies),
    );

    const dom$ = Observable.combineLatest(cookie.DOM, shop.DOM)
        .map(([cookieDOM, shopDOM]) => renderApp(cookieDOM, shopDOM));

    return {
        DOM: dom$,
        state: stateChanges$,
    };
}

export const App = Component(AppComponent);
