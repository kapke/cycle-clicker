import {div, VNode} from "@cycle/dom";
import isolate from "@cycle/isolate";
import {Observable} from "rxjs";
import {SourceWithDOM} from "../declarations";
import {SourceWithState, State} from "../State";
import {Cookie} from "./Cookie";

function renderPage (state: State, cookie: VNode): VNode {
    return div([
        cookie,
        div('.cursor', 'cursor 1/s 5'),
    ]);
}

export function AppComponent (sources: SourceWithState & SourceWithDOM) {
    const cookie = Cookie(sources);

    const stateChanges$ = cookie.clickedCookies;

    const dom$ = Observable.combineLatest(sources.state, cookie.DOM)
        .map(([state, cookieDOM]) => renderPage(state, cookieDOM));

    return {
        DOM: dom$,
        state: stateChanges$,
    };
}

export function App (sources: SourceWithDOM & SourceWithState) {
    return isolate(AppComponent)(sources);
}
