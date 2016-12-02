import {div, VNode} from "@cycle/dom";
import {Observable} from "rxjs";

import {SourceWithDOM} from "../declarations";
import {Component} from "../helpers";
import {SourceWithState, State} from "../State";
import {Cookie} from "./Cookie";


function renderApp (state: State, cookie: VNode): VNode {
    return div([
        cookie,
        div('.cursor', 'cursor 1/s 5'),
    ]);
}

export function AppComponent (sources: SourceWithState & SourceWithDOM) {
    const cookie = Cookie(sources);

    const stateChanges$ = cookie.clickedCookies;

    const dom$ = Observable.combineLatest(sources.state, cookie.DOM)
        .map(([state, cookieDOM]) => renderApp(state, cookieDOM));

    return {
        DOM: dom$,
        state: stateChanges$,
    };
}

export const App = Component(AppComponent);
